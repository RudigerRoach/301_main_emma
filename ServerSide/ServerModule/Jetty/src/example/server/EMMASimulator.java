package example.server;

import java.awt.image.BufferedImage;

public class EMMASimulator {

    linkedList images = null;
    BufferedImage[] Images = null;
    String[] Judges = null;
    int topRange = 0;
    int botRange = 0;
    
    public EMMASimulator()
    {
    	this.setRanges(0, 10);
    	String[] judges = new String[11];
        judges[0]= "Jannie Smit";
        judges[1]= "Koosie Smit";
        judges[2]= "Errol Pieterse";
        judges[3]= "Susan Scoltz";
        judges[4]= "Emma Green";
        judges[5]= "Alan Davies";
        judges[6]= "Greg Hamming";
        judges[7]= "Lisa Simpson";
        judges[8]= "George Bush";
        judges[9]= "Schalk Burger";
        judges[10]= "test";
        this.setJudges(judges);
    }
    
    public void setJudges(String[] judges)
    {
        Judges = judges;
    }
    
    public String[] getJudges()
    {
        if(Judges == null)
            return null;
        else return Judges;
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

    
    
//    public static void main(String[] args)
//    {
//        // TODO code application logic here
//        EMMASimulator myEmma = new EMMASimulator();
//        myEmma.setRanges(0, 10);
//        System.out.println("The bottom range of scores is: " + myEmma.getBotRange());
//        System.out.println("The top of scores range is: " + myEmma.getTopRange());
//        String[] judges = new String[10];
//        judges[0]= "Jannie Smit";
//        judges[1]= "Koosie Smit";
//        judges[2]= "Errol Pieterse";
//        judges[3]= "Susan Scoltz";
//        judges[4]= "Emma Green";
//        judges[5]= "Alan Davies";
//        judges[6]= "Greg Hamming";
//        judges[7]= "Lisa Simpson";
//        judges[8]= "George Bush";
//        judges[9]= "Schalk Burger";
//        myEmma.setJudges(judges);
//        
//        String[] ret = myEmma.getJudges();
//        System.out.println("The Judges are as follows:");
//        for(int i = 0; i < myEmma.getJudges().length; i++)
//            System.out.println("                    "+ ret[i]);
//        
//    
//    }
}
