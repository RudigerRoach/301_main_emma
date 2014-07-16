/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author Dieter
 */

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.eclipse.jetty.continuation.Continuation;
import org.eclipse.jetty.continuation.ContinuationSupport;

import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.servlet.ServletContextHandler;
import org.eclipse.jetty.servlet.ServletHolder;
import org.json.JSONException;
import org.json.JSONObject;
 
public class MinimalServer 
{
    private static Server server = null;
    private Session session = null;
    private boolean start = false;

    /**
     * Constructor for the server
     * @param _session
     * @throws Exception
     */
    public MinimalServer(Session _session) throws Exception
    {
        //Create server
        session = _session;
        server = new Server(5555);
        ServletContextHandler context = new ServletContextHandler(ServletContextHandler.SESSIONS);
        context.setContextPath("/");
        server.setHandler(context);
        LoginServlet loginServlet = new LoginServlet();
        StartServlet startServlet = new StartServlet();
        context.addServlet(new ServletHolder(loginServlet), "/login");
        context.addServlet(new ServletHolder(startServlet), "/start");
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

    public void startSession()
    {
        start = true;
    }
    
    public class StartServlet extends HttpServlet
    {
        @Override
        protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
        {
            if (request.getSession(false) != null)
            {
                //moet nog async calls uit figure anders gaan ons polling moet gebruik
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
    //HttpSession session = req.getSession(false)
    public class LoginServlet extends HttpServlet 
    {
    	/**
    	 * Overrides the post method to do post communication
             * @param request
             * @param response
             * @throws javax.servlet.ServletException
             * @throws java.io.IOException
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
                String [] judges = session.getJudges();
                if (judges != null)
                {
                    for (String judge : judges) 
                    {
                        if (user.equals(judge)) 
                        {
                            loginSuccess = true;
                        }
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
            	File file = new File("Data.txt");
            	FileReader inputFile = new FileReader(file);
                String userAuto;
                boolean loginSuccess;
                try (BufferedReader bf = new BufferedReader(inputFile)) 
                {
                    String line;
                    userAuto = "";
                    loginSuccess = false;
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
                }
            	
            	//get the judges from emma
                String [] judges = session.getJudges();
                if (judges != null)
                {
                    for (String judge : judges) 
                    {
                        if (userAuto.equals(judge)) 
                        {
                            loginSuccess = true;
                        }
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
