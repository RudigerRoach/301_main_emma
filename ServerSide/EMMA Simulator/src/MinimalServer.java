/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author Dieter
 */


import java.awt.image.BufferedImage;
import java.io.File;
import javax.imageio.ImageIO;
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.servlet.ServletContextHandler;
import org.eclipse.jetty.servlet.ServletHolder;
 
public class MinimalServer 
{
    private static Server server = null;
    public static Session session = null;
    public static boolean start = false;
    public static BufferedImage [] images = null;

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
        String[] _judges = new String[5];
        _judges[0]= "Johan";
        _judges[1]= "test";
        _judges[2]= "test123";
        _judges[3]= "Test3";
        _judges[4]= "Test4";
        String [] tmp = new String[1];
        tmp[0] = "helo";
        linkedList tmp2 = new linkedList();
        tmp2.info = "stellies.jpg";
        BufferedImage[] tmp3 = new BufferedImage[1];
        tmp3[0] = ImageIO.read(new File("stellies.jpg"));
        session = new Session(tmp2, tmp3, _judges,10,0,true,true,tmp);     
        images = session.getImages();
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
