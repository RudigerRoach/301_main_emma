
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
        System.out.println("A");
        if (request.getSession(false) != null)
        {
            System.out.println("before start");
            while(MinimalServer.start == false){}
            System.out.println("before end");

            JSONObject jsonResponse = new JSONObject();
            try 
            {
                jsonResponse.put("start", "true");
            } 
            catch (JSONException ex) 
            {
                Logger.getLogger(MinimalServer.class.getName()).log(Level.SEVERE, null, ex);
            }
            response.setContentType("application/json;charset=UTF-8");
            response.getWriter().print(jsonResponse);
        }
        else
        {
            JSONObject jsonResponse = new JSONObject();
                try 
                {
                    jsonResponse.put("status", "failed");
                } 
                catch (JSONException e) 
                {
                    e.printStackTrace();
                }

                //response to failed login
                response.setContentType("application/json;charset=UTF-8");
                response.getWriter().print(jsonResponse);
        }
    }
}
