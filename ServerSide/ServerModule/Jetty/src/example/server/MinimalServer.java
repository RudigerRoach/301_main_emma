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
	
	/**
	 * Constructor for the server
	 * @throws Exception
	 */
	public MinimalServer() throws Exception
	{
		//Create server
    	server = new Server(5555);
		ServletContextHandler context = new ServletContextHandler(ServletContextHandler.SESSIONS);
		context.setContextPath("/");
		server.setHandler(context);
		LoginServlet testLoginServlet = new LoginServlet();
		context.addServlet(new ServletHolder(testLoginServlet), "/login");
        server.start();
	}
	
	/**
	 * Closes and stops the server
	 * @throws Exception
	 */
	public void close() throws Exception
	{
		if (server != null)
			server.stop();
	}
	
//    public static void main(String[] args) throws Exception 
//    {
//    	//Create server
//    	server = new Server(5555);
//		ServletContextHandler context = new ServletContextHandler(ServletContextHandler.SESSIONS);
//		context.setContextPath("/");
//		server.setHandler(context);
//		MinimalServer testServer = new MinimalServer();
//		MinimalServer.LoginServlet testLoginServlet = testServer.new LoginServlet();
//		context.addServlet(new ServletHolder(testLoginServlet), "/login");
//		//context.addServlet(new ServletHolder(), "/login");
//        server.start();
//    }
	/**
	 * Login servlet class
	 * @author Dieter
	 *
	 */
    @SuppressWarnings("serial")
    public class LoginServlet extends HttpServlet 
    {
    	/**
    	 * Overrides the post method to do post communication
    	 */
        @Override
        //Handle post requests
        protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
        {
        	//Get post parameters
            String user = request.getParameter("email");
            String id = request.getParameter("deviceUID");
            //test if new login
            if(user != null)
            {
            	
            	boolean loginSuccess = false;
            	
            	//Getting judges from emma
            	//will get this through session object that johan will send me
            	emma = new EMMASimulator();
                String [] judges = emma.getJudges();
	            for(int i = 0; i < judges.length;i++)
	            {
	            	if(user.equals(judges[i]))
	            	{
	            		loginSuccess = true;
	            	}
	            }
	            
	            //Successful login
            	if (loginSuccess == true)
            	{
            		//moet email en device id add as geen remembered is nie
            		//moet email verander as deviceid gevind is
            		//moet deviceid verander as email gevind is
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
            else //test if it is auto login
            {
            	//if no parameters are sent through
            	if(id == null)
            	{
            		id = "";
            	}
            	File file = new File("src/example/server/Data.txt");
            	FileReader inputFile = new FileReader(file);
            	BufferedReader bf = new BufferedReader(inputFile);
            	String line = null;
            	String userAuto = "";
            	boolean loginSuccess = false;
            	
            	//searches for user corresponding to device id
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
            	
            	//get the judges from emma
            	emma = new EMMASimulator();
                String [] judges = emma.getJudges();
	            for(int i = 0; i < judges.length;i++)
	            {
	            	if(userAuto.equals(judges[i]))
	            	{
	            		loginSuccess = true;
	            	}
	            }
	            
	            //successFull autoLogin
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
	            	
            		//response to successful auto login
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
	            	
	            	//response to failed auto login
	            	response.setContentType("application/json;charset=UTF-8");
	            	response.getWriter().print(jsonResponse);
	            }
            }
        }
    }
}