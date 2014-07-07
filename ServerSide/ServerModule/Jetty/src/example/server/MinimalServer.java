package example.server;
 
import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.servlet.ServletContextHandler;
import org.json.JSONException;
import org.json.JSONObject;
 
public class MinimalServer 
{
	private static Server server = null;
	private EMMASimulator emma = null;
	
//	public MinimalServer(int port) throws Exception
//	{
//		server = new Server(port);
//    	ServletHandler handler = new ServletHandler();
//    	handler.addServletWithMapping(LoginServlet.class, "/login");//Set the servlet to run.
//    	server.setHandler(handler);
//    	server.start();
//    	server.join();
//	}
//	
//	public void close() throws Exception
//	{
//		if (server != null)
//			server.stop();
//	}
	
    public static void main(String[] args) throws Exception 
    {
    	//Create server
    	server = new Server(8080);
		ServletContextHandler context = new ServletContextHandler(ServletContextHandler.SESSIONS);
		context.setContextPath("/");
		server.setHandler(context);
		context.addServlet(LoginServlet.class, "/login");
        server.start();
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
            	File file = new File("src/example/server/Data.txt");
            	FileReader inputFile = new FileReader(file);
            	BufferedReader bf = new BufferedReader(inputFile);
            	boolean boolEmail = false, booldeviceID = false;
            	
            	String line = null;
            	while((line = bf.readLine()) != null)
            	{
            		String [] values = line.split(",");
            		if(values[0].equals(user) == true)
                	{
                		boolEmail = true;
                		if(values[1].equals(id) == true)
                		{
                			booldeviceID = true;
                		}
                		//break;
                	}
                	else if (values[1].equals(id) == true)
                	{
                		booldeviceID = true;
                		//break;
                	}
            	}
            	
            	bf.close();
            	
            	if ((booldeviceID == true) && (boolEmail == true))
            	{
            		System.out.println("Remembered");
            	}
            	else if (booldeviceID == true)
            	{
            		System.out.println("New email on same device");
            	}
            	else if (boolEmail == true)
            	{
            		System.out.println("New device on this email");
            	}
            	else
            	{
            		System.out.println("Don't remember device");
            	}
            	
            	//login successful need to do database with user id's and plug in with Emma dummy
            	emma = new EMMASimulator();
            	String [] judges = emma.getJudges();
            	boolean loginSuccess = false;
            	for(int i = 0; i < judges.length;i++)
            	{
            		if(user.equals(judges[i]))
            		{
            			loginSuccess = true;
            		}
            	}
            	
            	if (loginSuccess == true)
            	{
            		JSONObject jsonResponse = new JSONObject();
            		try 
	            	{
	            		jsonResponse.put("status", "success");
	            		jsonResponse.put("session_id", request.getSession().getId());
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