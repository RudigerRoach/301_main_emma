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
import org.eclipse.jetty.servlet.ServletHolder;
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
    	server = new Server(5555);
		ServletContextHandler context = new ServletContextHandler(ServletContextHandler.SESSIONS);
		context.setContextPath("/");
		server.setHandler(context);
		MinimalServer testServer = new MinimalServer();
		MinimalServer.LoginServlet testLoginServlet = testServer.new LoginServlet();
		context.addServlet(new ServletHolder(testLoginServlet), "/login");
		//context.addServlet(new ServletHolder(), "/login");
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
            	
            	boolean loginSuccess = false;
            	
            	emma = new EMMASimulator();
                String [] judges = emma.getJudges();
	            for(int i = 0; i < judges.length;i++)
	            {
	            	if(user.equals(judges[i]))
	            	{
	            		loginSuccess = true;
	            	}
	            }
            	
            	
            	
            	//login successful need to do database with user id's and plug in with Emma dummy
            	
            	
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
	            	response.getWriter().print(jsonResponse);
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
	            	response.getWriter().print(jsonResponse);
	            }
	        }
            else
            {
            	File file = new File("src/example/server/Data.txt");
            	FileReader inputFile = new FileReader(file);
            	BufferedReader bf = new BufferedReader(inputFile);
            	String line = null;
            	String userAuto = "";
            	boolean loginSuccess = false;
            	
            	while((line = bf.readLine()) != null)
            	{
            		String [] values = line.split(",");
            		if(values[1].equals(id) == true)
                	{
            			userAuto = values[0];
                		break;
                	}
            	}
            	
            	
            	bf.close();

            	emma = new EMMASimulator();
                String [] judges = emma.getJudges();
	            for(int i = 0; i < judges.length;i++)
	            {
	            	if(userAuto.equals(judges[i]))
	            	{
	            		loginSuccess = true;
	            	}
	            }
            	
            	
            	
            	//login successful need to do database with user id's and plug in with Emma dummy
            	
            	
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
	            	response.getWriter().print(jsonResponse);
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
	            	response.getWriter().print(jsonResponse);
	            }
            }
        }
    }
}