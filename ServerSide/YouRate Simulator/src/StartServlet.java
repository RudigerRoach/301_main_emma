
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author Dieter
 */
public class StartServlet extends HttpServlet
{
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
    {
        if (request.getSession(false) != null)
        {
            while(uRateServer.start == false){}
            String judge = request.getParameter("deviceUID");
            String email = uRateServer.database.getMail(judge);
            System.out.println(email);
            int current = 0;
            int j = 0;
            for (int i = 0; i < uRateServer.judgesList.size();i++)
            {
                if (uRateServer.judgesList.get(i).getJudgeName().equals(email))
                {
                    j = i;
                    current = uRateServer.judgesList.get(i).getCurrentImage() - 1;
                }
            }
            JSONObject jsonResponse = new JSONObject();
            try 
            {
//                "status": "1", //0 if the app should keep waiting, 1 for success, 2 if the votong session has fininshed
//		        "sessionType": "normal", //alternatively yesNo or winner
//		        "rangeBottom": "0",
//		        "rangeTop": "15",
//		        "description": "image discription here",
//		        "comments": "True",  //True if comments are allowed, False if not
//		        "imgPath": "path/to/image.jpg" //the path where the image resides on the server
                if((uRateServer.session.getType().equals("normal") == true) || (uRateServer.session.getType().equals("yesNo") == true))
                {
                    if (current < uRateServer.totaalImages)
                    {
                        jsonResponse.put("status", "1");
                        jsonResponse.put("sessionType",uRateServer.session.getType());
                        jsonResponse.put("rangeBottom", uRateServer.session.getBotRange());
                        jsonResponse.put("rangeTop", uRateServer.session.getTopRange());
                        jsonResponse.put("description", uRateServer.session.getImageDetails(current));
                        //check hierna
                        jsonResponse.put("comments", "true");
                        String path = uRateServer.tmpCompressedImage[current].getAbsolutePath().replace("\\", "/");
                        String path2 = path.substring(path.indexOf("/temp")+1, path.length());
                        jsonResponse.put("imgPath",path2);
                    }
                    else
                    {
                        jsonResponse.put("status","2");
                    }
                }
                else if (uRateServer.session.getType().equals("winner") == true)
                {
                    System.out.println("asdf " + uRateServer.judgesList.get(j).hasVote());
                    if(uRateServer.judgesList.get(j).hasVote() == false)
                    {
                        jsonResponse.put("status", "1");
                        jsonResponse.put("sessionType",uRateServer.session.getType());
                        jsonResponse.put("rangeBottom", uRateServer.session.getBotRange());
                        jsonResponse.put("rangeTop", uRateServer.session.getTopRange());
                        List < String > list1 = new ArrayList < String > ();
                        for(int i = 0; i < uRateServer.totaalImages; i++)
                        {
                            String path = uRateServer.session.getImageDetails(i);
                            list1.add(path);  
                        }

                        JSONArray array1 = new JSONArray();
                        for(int i = 0; i < list1.size();i++)
                        {
                            array1.put(i, list1.get(i));
                        }
                        jsonResponse.put("description", array1);
                        //check hierna
                        jsonResponse.put("comments", "true");
                        jsonResponse.put("imgTotaal" , uRateServer.totaalImages);
                        List < String > list = new ArrayList < String > ();
                        for(int i = 0; i < uRateServer.totaalImages; i++)
                        {
                            String path = uRateServer.tmpCompressedImage[i].getAbsolutePath().replace("\\", "/");
                            String path2 = path.substring(path.indexOf("/temp")+1, path.length());
                            list.add(path2);  
                        }

                        JSONArray array = new JSONArray();
                        for(int i = 0; i < list.size();i++)
                        {
                            array.put(i, list.get(i));
                        }

                        jsonResponse.put("imgPaths", array);
                    }
                    else
                    {
                        jsonResponse.put("status","2");
                        response.setContentType("application/json;charset=UTF-8");
                        response.getWriter().print(jsonResponse);
                        return;
                    }
                }
            } 
            catch (JSONException ex) 
            {
                Logger.getLogger(uRateServer.class.getName()).log(Level.SEVERE, null, ex);
            }
            response.setContentType("application/json;charset=UTF-8");
            response.getWriter().print(jsonResponse);
        }
    }
}
