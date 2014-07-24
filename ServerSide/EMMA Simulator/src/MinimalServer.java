/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author Dieter
 */


import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.servlet.ServletContextHandler;
import org.eclipse.jetty.servlet.ServletHolder;
 
public class MinimalServer 
{
    private static Server server = null;
    public static Session session = null;
    public static boolean start = false;

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
    
    public static void main(String[] args) throws Exception
    {
        //Create server
        session = new Session();
        String[] _judges = new String[5];
        _judges[0]= "Johan";
        _judges[1]= "test";
        _judges[2]= "test123";
        _judges[3]= "Test3";
        _judges[4]= "Test4"; 
        session.setJudges(_judges);
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
}
