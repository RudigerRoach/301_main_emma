package example.server;
 
import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.servlet.ServletHandler;
import org.json.JSONException;
import org.json.JSONObject;
 
public class MinimalServer 
{
	
    public static void main(String[] args) throws Exception 
    {
    	//Create server
        Server server = new Server(8080);
        ServletHandler handler = new ServletHandler();
        handler.addServletWithMapping(LoginServlet.class, "/login");//Set the servlet to run.
        server.setHandler(handler);
        server.start();
        server.join();
    }
 
    @SuppressWarnings("serial")
    public class LoginServlet extends HttpServlet 
    {
        @Override
        //Handle post requests
        protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
        {
        	//Get post parameters
            String user = request.getParameter("email");
            String id = request.getParameter("deviceUID");
            
            //test if no parameters are sent
            if(user != null)
            {
            	//login successful need to do database with user id's and plug in with Emma dummy
            	if ((user).equals("test")== true)
            	{
            		JSONObject jsonResponse = new JSONObject();
            		try 
	            	{
	            		jsonResponse.put("status", "success");
	            		//SessionID manage
	            		jsonResponse.put("session_id", "123");
					} 
	            	catch (JSONException e) 
	            	{
						e.printStackTrace();
					}
	            	
            		//response to successful login
	            	response.setContentType("application/json;charset=UTF-8");
	            	response.getWriter().print(jsonResponse.toString());
	            }
	            //Login fails
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
	            	response.getWriter().print(jsonResponse.toString());
	            }
	        }
            else
            	System.out.println("Parameter is null..");
        }
    }
}