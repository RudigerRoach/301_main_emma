
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
            System.out.println("before start");
            while(MinimalServer.start == false){}
            System.out.println("before end");
            String judge = request.getParameter("deviceUID");
            DBAccess database = new DBAccess();
            database.open();
            String email = database.getMail(judge);
            int current = 0;
            for (int i = 0; i < MinimalServer.judgesList.size();i++)
            {
                if (MinimalServer.judgesList.get(i).getJudgeName().equals(email))
                {
                    current = MinimalServer.judgesList.get(i).getCurrentImage() - 1;
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
                if((MinimalServer.session.getType().equals("normal") == true) || (MinimalServer.session.getType().equals("yesNo") == true))
                {
                    jsonResponse.put("status", "1");
                    jsonResponse.put("sessionType",MinimalServer.session.getType());
                    jsonResponse.put("rangeBottom", MinimalServer.session.getBotRange());
                    jsonResponse.put("rangeTop", MinimalServer.session.getTopRange());
                    jsonResponse.put("description", MinimalServer.session.getImageDetails(0));
                    //check hierna
                    jsonResponse.put("comments", "true");
                    jsonResponse.put("imgPath","temp/" + MinimalServer.tmpCompressedImage[current].getName()); 
                }
                else if (MinimalServer.session.getSessionType().equals("winner") == true)
                {
                    jsonResponse.put("status", "1");
                    jsonResponse.put("sessionType",MinimalServer.session.getType());
                    jsonResponse.put("rangeBottom", MinimalServer.session.getBotRange());
                    jsonResponse.put("rangeTop", MinimalServer.session.getTopRange());
                    jsonResponse.put("description", MinimalServer.session.getImageDetails(0));
                    //check hierna
                    jsonResponse.put("comments", "true");
                    jsonResponse.put("imgTotaal" , MinimalServer.totaalImages);
                    List < String > list = new ArrayList < String > ();
                    for(int i = 0; i < MinimalServer.totaalImages; i++)
                    {
                       list.add("temp/" + MinimalServer.tmpCompressedImage[i].getName());  
                    }
                    
                    JSONArray array = new JSONArray();
                    for(int i = 0; i < list.size();i++)
                    {
                        array.put(list.get(i));
                    }
                    
                    jsonResponse.put("imgPaths", array);
                }
            } 
            catch (JSONException ex) 
            {
                Logger.getLogger(MinimalServer.class.getName()).log(Level.SEVERE, null, ex);
            }
            response.setContentType("application/json;charset=UTF-8");
            response.getWriter().print(jsonResponse);
            database.close();
        }
//        else
//        {
//            JSONObject jsonResponse = new JSONObject();
//                try 
//                {
//                    jsonResponse.put("status", "failed");
//                } 
//                catch (JSONException e) 
//                {
//                    e.printStackTrace();
//                }
//
//                //response to failed login
//                response.setContentType("application/json;charset=UTF-8");
//                response.getWriter().print(jsonResponse);
//        }
    }
}
