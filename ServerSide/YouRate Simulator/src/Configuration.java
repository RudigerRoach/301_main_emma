import java.awt.image.BufferedImage;
import java.io.*;
import javax.imageio.ImageIO;

public class Configuration 
{
    private final static Configuration instance = new Configuration();
    public static Configuration getInstance() {
        return instance;
    }
    
    
    
    linkedList imageID = null;
    BufferedImage[] images = null;
    String[] judges = null;
    int topRange = 0;
    int botRange = 0;
    Boolean openSession = false;
    Boolean controlledSession = true;
    String[] imageDetails;
    String type;
    Boolean commentsEnabled;
    
    public Configuration(linkedList _imageID, BufferedImage[] _images, String[] _judges,int _topRange,int _botRange, Boolean _openSession,Boolean _controlledSession,String[] _imageDetails,String _type,Boolean _commentsEnabled )
    {
        imageID = _imageID;
        images = _images;
        judges = _judges;
        topRange = _topRange;
        botRange = _botRange;
        openSession = _openSession;
        controlledSession = _controlledSession;
        imageDetails = _imageDetails;
        type = _type;
        commentsEnabled = _commentsEnabled;
    }

    Configuration() 
    {
        
    }
    
    public void setJudges(String[] _judges)
    {
        judges = _judges;
        if(judges == null)
            openSession = true;
        else openSession = false;
    }
    
    public Boolean getCommentsEnabled()
    {
        return commentsEnabled;
    }
    public Boolean getSessionType()
    {
        if (openSession)
            return true;
        return false;
    }
    
    public String getType()
    {
        return type;
    }
    
    public String[] getJudges()
    {
        if(judges == null)
            return null;
        else return judges;
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
        
        try
        {
            return imageDetails[image];
        }
        catch(Exception x){}
        
        return null;
    }

    public BufferedImage[] getImages()
    {
        return images;
    }

    public void loadImages() throws FileNotFoundException, IOException
    {
        BufferedReader br = new BufferedReader(new FileReader("Photos.txt"));
        String line;
        imageID = new linkedList();
        int count = 0;
        while ((line = br.readLine()) != null) 
        {
                count++;
                linkedList a = new linkedList();
                a.id = Long.parseLong(line);
                a.next = null;
            if(imageID == null)
                imageID = a;
            else    
            {
                linkedList current = imageID;
                while(current.next != null)
                    current = current.next;

                current.next = a;
            }
        }
        br.close();
        images = new BufferedImage[count];
        
        linkedList temp = imageID;
        count = 0;
        
        while(temp != null)
        {
            temp = temp.next;
            try 
            {
                images[count] = ImageIO.read(new File(temp.id.toString() + ".jpg"));
                count++;
                
            } 
            catch (IOException e) {System.out.println("The following exeption was handled: "+e);}
        }
        imageDetails = new String[count];
    }
    
    
}