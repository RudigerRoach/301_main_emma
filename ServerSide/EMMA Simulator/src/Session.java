
import java.awt.image.BufferedImage;

public class Session 
{
    linkedList imageNames = null;
    BufferedImage[] images = null;
    String[] judges = null;
    int topRange = 0;
    int botRange = 0;
    Boolean openSession = false;
    Boolean controlledSession = true;
    String[] imageDetails;
    
    public Session(linkedList _imageNames, BufferedImage[] _images, String[] _judges,int _topRange,int _botRange, Boolean _openSession,Boolean _controlledSession,String[] _imageDetails)
    {
        imageNames = _imageNames;
        images = _images;
        judges = _judges;
        topRange = _topRange;
        botRange = _botRange;
        openSession = _openSession;
        controlledSession = _controlledSession;
        imageDetails = _imageDetails;
    }

    Session() 
    {
        
    }
    
    public void setJudges(String[] _judges)
    {
        judges = _judges;
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

    BufferedImage[] getImages() {
        throw new UnsupportedOperationException("Not yet implemented");
    }

    void loadImages() {
        throw new UnsupportedOperationException("Not yet implemented");
    }
    
    
}