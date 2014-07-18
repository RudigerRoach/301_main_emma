/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author Dieter
 */

import java.io.File;
import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.servlet.ServletContextHandler;
import org.eclipse.jetty.servlet.ServletHolder;
import org.json.JSONException;
import org.json.JSONObject;
import java.sql.*;
import org.eclipse.jetty.continuation.Continuation;
import org.eclipse.jetty.continuation.ContinuationSupport;
 
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

    public void startSession() throws InterruptedException
    {
        System.out.println("Start session is geroep");
        start = true;
    }
    
    public class StartServlet extends HttpServlet
    {
        @Override
        protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
        {
//            if (request.getSession(false) != null)
//            {
                System.out.println("before start");
                while(start == false){}
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
//            }
//            else
//            {
//                JSONObject jsonResponse = new JSONObject();
//                    try 
//                    {
//                        jsonResponse.put("status", "failed");
//                    } 
//                    catch (JSONException e) 
//                    {
//                        e.printStackTrace();
//                    }
//
//                    //response to failed login
//                    response.setContentType("application/json;charset=UTF-8");
//                    response.getWriter().print(jsonResponse);
//            }
        }
    }

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
                try
                {
                    File data = new File("youRateSystem.accdb");
                    Class.forName("sun.jdbc.odbc.JdbcOdbcDriver");
                    String database = "jdbc:odbc:Driver={Microsoft Access Driver (*.mdb, *.accdb)};DBQ=" + data.getAbsolutePath() + ";";
                    Connection conn = DriverManager.getConnection(database,"","");
                    Statement s = conn.createStatement();

                    String table = "SELECT * FROM AutoLogin WHERE email='" + user + "';";
                    s.execute(table);
                    ResultSet rs = s.getResultSet();
                    
                    if(rs == null)
                    {
                        Statement s3 = conn.createStatement();
                        s3.execute("SELECT * FROM AutoLogin WHERE deviceUID='" + id +"';");
                        rs = s3.getResultSet();
                        if(rs == null)
                        {
                            System.out.println("Don't Remember Device...");
                            String sql = "INSERT INTO AutoLogin (email , deviceUID) VALUES (?,?);";
                            PreparedStatement preparedStatement = conn.prepareStatement(sql);
                            preparedStatement.setString(2, user);
                            preparedStatement.setString(3, id);
                            preparedStatement.executeUpdate();
                            preparedStatement.close();
                        }
                        else
                        {
                            System.out.println("Remember DeviceUID...");
                            Statement s2 = conn.createStatement();
                            s2.executeUpdate("UPDATE AutoLogin SET deviceUID='" + id + "'  WHERE email= '" + user + "';");
                            s2.close();
                        }
                        s3.close();
                    }
                    else
                    {
                        Statement s3 = conn.createStatement();
                        s3.execute("SELECT * FROM AutoLogin WHERE deviceUID='" + id +"' AND email= '" + user + "';");
                        rs = s3.getResultSet();
                        
                        if(rs == null)
                        {
                            System.out.println("Remember user...");
                            Statement s2 = conn.createStatement();
                            s2.executeUpdate("UPDATE AutoLogin SET deviceUID='" + id + "'  WHERE email= '" + user + "';");
                            s2.close();
                        }
                        else
                        {
                            System.out.println("Remember Device...");
                        }
                        s3.close();
                    }
                    s.close();
                    conn.close();
                } 
                catch (ClassNotFoundException | SQLException ex)
                {
                    Logger.getLogger(MinimalServer.class.getName()).log(Level.SEVERE, null, ex);
                }
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
                String userAuto= "";
                boolean loginSuccess = false;
                
                try 
                {
                    File data = new File("youRateSystem.accdb");
                    Class.forName("sun.jdbc.odbc.JdbcOdbcDriver");
                    String database = "jdbc:odbc:Driver={Microsoft Access Driver (*.mdb, *.accdb)};DBQ=" + data.getAbsolutePath() + ";";
                    Connection conn = DriverManager.getConnection(database,"","");
                    Statement s = conn.createStatement();
                    
                    String table = "SELECT * FROM AutoLogin";
                    s.execute(table);
                    ResultSet rs = s.getResultSet();
                    while((rs != null)&&(rs.next()))
                    {
                        if (rs.getString(3).equals(id))
                        {
                            userAuto = rs.getString(2);
                        }
                    }
                    
                    s.close();
                    conn.close();
                } 
                catch (SQLException | ClassNotFoundException ex) 
                {
                    Logger.getLogger(MinimalServer.class.getName()).log(Level.SEVERE, null, ex);
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
