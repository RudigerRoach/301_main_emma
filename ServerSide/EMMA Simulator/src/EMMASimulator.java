import java.awt.*;
import java.awt.image.BufferedImage;
import javax.swing.*;
import java.io.*;
import java.net.Socket;
import java.util.Currency;
import java.util.Queue;
import java.util.Scanner;
import javax.imageio.ImageIO;

public class EMMASimulator {

    linkedList images = null;
    BufferedImage[] Images = null;
    String[] Judges = null;
    int topRange = 0;
    int botRange = 0;
    Boolean openSession = false;
    Boolean controlledSession = true;
    String[] imageDetails;
    
    public EMMASimulator()
    {
        try
        {
            loadImages();
        }
        catch(Exception ex){System.out.println("Problem loading images");}

    }
    
    public void setJudges(String[] judges)
    {
        Judges = judges;
        if(judges == null)
            openSession = true;
        else openSession = false;
    }
    
    public Boolean getSessionType()
    {
        if (openSession)
            return true;
        return false;
    }
    
    public String[] getJudges()
    {
        if(Judges == null)
            return null;
        else return Judges;
    }
    
    public void setControll(Boolean cont)
    {
        controlledSession = cont;
    }
    
    public Boolean getControll()
    {
        return controlledSession;
    }
    
    public void setRanges(int bot, int top)
    {
        botRange = bot;
        topRange = top;
    }
    
    public int getTopRange()
    {
        return topRange;
    }
    
    public int getBotRange()
    {
        return botRange;
    }
    
    public void loadImages() throws FileNotFoundException, IOException
    {
        BufferedReader br = new BufferedReader(new FileReader("Photos.txt"));
        String line;
        images = new linkedList();
        int count = 0;
        while ((line = br.readLine()) != null) 
        {
                count++;
                linkedList a = new linkedList();
                a.info = line;
                a.next = null;
            if(images == null)
                images = a;
            else    
            {
                linkedList current = images;
                while(current.next != null)
                    current = current.next;

                current.next = a;
            }

        }
        br.close();
        Images = new BufferedImage[count];
        
        linkedList temp = images;
        count = 0;
        
        while(temp != null)
        {
            temp = temp.next;
            System.out.println("Test yields:" + temp.info);
            try 
            {
                Images[count] = ImageIO.read(new File(images.info));
                count++;
                
            } 
            catch (IOException e) {System.out.println("The following exeption was handled: "+e);}
        }
        imageDetails = new String[count];
    }
    
    public BufferedImage[] getImages()
    {
        return Images;
    }
    
    
    public void setAllImageDetails(String[] details)
    {
        imageDetails = details;
    }
    
    public String[] getAllImageDetails()
    {
        return imageDetails;
    }
    
    public void setImageDetails(int image, String details)
    {
        try
        {
            imageDetails[image] = details;
        }
        catch(Exception x){}
    }
    
    public String getImageDetails(int image)
    {
        
        if(image < Images.length)
            return imageDetails[image];  
        return null;
    }
    
    public static void main(String args[])
    {
        
    }
   
}
