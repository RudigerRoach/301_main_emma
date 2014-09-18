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
import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;
import java.util.concurrent.atomic.AtomicInteger;
import javax.imageio.IIOImage;
import javax.imageio.ImageIO;
import javax.imageio.ImageWriteParam;
import javax.imageio.ImageWriter;
import javax.imageio.plugins.jpeg.JPEGImageWriteParam;
import javax.imageio.stream.ImageOutputStream;
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.servlet.ServletContextHandler;
import org.eclipse.jetty.servlet.ServletHolder;
 
public class MinimalServer 
{
    private static Server server = null;
    public static Session session = null;
    public static boolean start = false;
    public static BufferedImage [] images = null;
    public static File [] tmpCompressedImage = null;
    public static int totaalImages = 0;
    public static AtomicInteger currentPhoto = new AtomicInteger(1);
    public static List<Judge> judgesList = new ArrayList<Judge>();

    /**
     * Constructor for the server
     * @param _session
     * @throws Exception
     */
    public MinimalServer(Session _session) throws Exception
    {
        //Create server
        session = _session;
        images = session.getImages();
        totaalImages = images.length;
        tmpCompressedImage = new File[totaalImages];
        for(int i = 0; i < totaalImages;i++)
        {
            tmpCompressedImage[i] = saveCompressedImage(images[i],"temp/" + (i+1) + ".jpg");
        }
        if(session.getControll() == false)
        {
            start = true;
        }
        server = new Server(5555);
        ServletContextHandler context = new ServletContextHandler(ServletContextHandler.SESSIONS);
        context.setContextPath("/");
        server.setHandler(context);
        LoginServlet loginServlet = new LoginServlet();
        StartServlet startServlet = new StartServlet();
        NextImageServlet nextImageServlet = new NextImageServlet();
        context.addServlet(new ServletHolder(loginServlet), "/login");
        context.addServlet(new ServletHolder(startServlet), "/start");
        context.addServlet(new ServletHolder(nextImageServlet), "/nextImage");
        for(int i = 1; i < totaalImages+1;i++)
        {
            getImage imageServlet = new getImage();
            context.addServlet(new ServletHolder(imageServlet),"/temp/" + i + ".jpg");
        }
        server.start();
    }    
//    public static void main(String[] args) throws Exception
//    {
//        //Create server
//        String[] _judges = new String[5];
//        _judges[0]= "Johan";
//        _judges[1]= "test";
//        _judges[2]= "test123@test.com";
//        _judges[3]= "Test3";
//        _judges[4]= "Test4";
//        String [] tmp = new String[2];
//        tmp[0] = "helo";
//        tmp[1] = "asdf";
//        linkedList tmp2 = new linkedList();
//        tmp2.info = "stellies.jpg";
//        tmp2.next = new linkedList();
//        tmp2.next.info = "guitar.jpg";
//        BufferedImage[] tmp3 = new BufferedImage[2];
//        tmp3[0] = ImageIO.read(new File("stellies.jpg"));
//        tmp3[1] = ImageIO.read(new File("guitar.jpg"));
//        session = new Session(tmp2, tmp3, _judges,10,0,false,false,tmp);     
//        images = session.getImages();
//        totaalImages = images.length;
//        tmpCompressedImage = new File[totaalImages];
//        for(int i = 0; i < totaalImages;i++)
//        {
//            tmpCompressedImage[i] = saveCompressedImage(images[i],"temp/" + (i+1) + ".jpg");
//        }
//        if(session.getControll() == false)
//        {
//            start = true;
//        }
//        server = new Server(5555);
//        ServletContextHandler context = new ServletContextHandler(ServletContextHandler.SESSIONS);
//        context.setContextPath("/");
//        server.setHandler(context);
//        LoginServlet loginServlet = new LoginServlet();
//        StartServlet startServlet = new StartServlet();
//        NextImageServlet nextImageServlet = new NextImageServlet();
//        for(int i = 1; i < totaalImages+1;i++)
//        {
//            getImage imageServlet = new getImage();
//            context.addServlet(new ServletHolder(imageServlet),"/temp/" + i + ".jpg");
//        }
//        context.addServlet(new ServletHolder(loginServlet), "/login");
//        context.addServlet(new ServletHolder(startServlet), "/start");
//        context.addServlet(new ServletHolder(nextImageServlet), "/nextImage");
//        server.start();
//    }
    
    private static File saveCompressedImage(BufferedImage image, String toFileName)
    {
        try 
        {
            Iterator iter = ImageIO.getImageWritersByFormatName("jpg");
            ImageWriter writer;
            writer = (ImageWriter) iter.next();
            
            File tmpFile = new File(toFileName);
            ImageOutputStream ios = ImageIO.createImageOutputStream(tmpFile);
            writer.setOutput(ios);

            ImageWriteParam iwparam = new JPEGImageWriteParam(Locale.getDefault());

            iwparam.setCompressionMode(ImageWriteParam.MODE_EXPLICIT);
            iwparam.setCompressionQuality(0.7F);

            writer.write(null, new IIOImage(image, null, null), iwparam);

            ios.flush();
            writer.dispose();
            ios.close();
            return tmpFile;
        }
        catch (IOException e) 
        {
            e.printStackTrace();
        }
        return null;
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
        System.out.println("Start session is geroep");
        start = true;
    }
    
    public void nextImage()
    {
        currentPhoto.getAndIncrement();
    }
    
    public int statusOnHowManyVoted()
    {
        int count = 0;
        int current = currentPhoto.get();
        for (Judge judgesList1 : judgesList) 
        {
            if(current == judgesList1.getCurrentImage())
            {
                count++;
            }
        }
        return count;
    }
    
    public int howManyLoggedIn()
    {
        return judgesList.size();
    }
    
    public int [][] getScores()
    {
        if (currentPhoto.get() == totaalImages)
        {
            int [][] temp = new int[session.judges.length][totaalImages];
            for(int i = 0; i < session.judges.length;i++)
            {
                temp[i] = judgesList.get(i).getCurrentScores();
            }
            return temp;
        }
        return null;
    }
}
