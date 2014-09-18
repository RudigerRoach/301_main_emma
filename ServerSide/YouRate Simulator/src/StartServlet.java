
import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
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
                    jsonResponse.put("controlled","true");
                    jsonResponse.put("sessionType",MinimalServer.session.getType());
                    jsonResponse.put("rangeBottom", MinimalServer.session.getBotRange());
                    jsonResponse.put("rangeTop", MinimalServer.session.getTopRange());
                    jsonResponse.put("description", MinimalServer.session.getImageDetails(0));
                    //check hierna
                    jsonResponse.put("comments", "true");
                    jsonResponse.put("imgPath","temp/" + MinimalServer.tmpCompressedImage[0].getName()); 
                }
                else if (MinimalServer.session.getSessionType().equals("winner") == true)
                {
                    jsonResponse.put("status", "1");
                    jsonResponse.put("controlled","false");
                    jsonResponse.put("sessionType",MinimalServer.session.getType());
                    jsonResponse.put("rangeBottom", MinimalServer.session.getBotRange());
                    jsonResponse.put("rangeTop", MinimalServer.session.getTopRange());
                    jsonResponse.put("description", MinimalServer.session.getImageDetails(0));
                    //check hierna
                    jsonResponse.put("comments", "true");
                    jsonResponse.put("imgTotaal" , MinimalServer.totaalImages);
                    for(int i = 0; i < MinimalServer.totaalImages; i++)
                    {
                       jsonResponse.put("imgPath","temp/" + MinimalServer.tmpCompressedImage[i].getName());  
                    }
                }
            } 
            catch (JSONException ex) 
            {
                Logger.getLogger(MinimalServer.class.getName()).log(Level.SEVERE, null, ex);
            }
            response.setContentType("application/json;charset=UTF-8");
            response.getWriter().print(jsonResponse);
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
