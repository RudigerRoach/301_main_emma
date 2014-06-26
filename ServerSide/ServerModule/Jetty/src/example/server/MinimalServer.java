package example.server;
 
import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.servlet.ServletHandler;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
 
public class MinimalServer 
{
	private static Server server = null;
	
    public static void main(String[] args) throws Exception 
    {
    	//Create server
        server = new Server(8080);
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
            String user = request.getParameter("user");
            String id = request.getParameter("id");
            
            
            //login successful need to do database with user id's and plug in with Emma dummy
            if (user.equals("test")== true)
            {
            	JSONObject jsonResponse = new JSONObject();
            	try 
            	{
            		jsonResponse.put("Status", "Success");
            		jsonResponse.put("SessionId", server.getSessionIdManager());
				} 
            	catch (JSONException e) 
            	{
					e.printStackTrace();
				}
            	
            	//need to respond with post with json object
            }
            //Login fails
            else
            {
            	
            }
            //System.out.println(user + " " + id);
        }
            
    }
}