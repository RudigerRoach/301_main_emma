package example.server;

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

import junit.framework.TestCase;

/**
 *
 * @author Endzeit
 */
public class EMMASimulatorTest extends TestCase {
    
    public EMMASimulatorTest(String testName) {
        super(testName);
    }

    /**
     * Test of setJudges method, of class EMMASimulator.
     */
    
    public void testSetJudges() {
        System.out.println("setJudges");
        String[] judges = new String[10];
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
        
        
        
        EMMASimulator instance = new EMMASimulator();
        instance.setJudges(judges);
        String[] ret = instance.getJudges();
        System.out.println("The Judges are as follows:");
        for(int i = 0; i < instance.getJudges().length; i++)
            System.out.println("                    "+ ret[i]);
        assertTrue(judges[0].equals(ret[0]));
        // TODO review the generated test code and remove the default call to fail.
        //fail("The setJudges is not working.");
    }

    /**
     * Test of getJudges method, of class EMMASimulator.
     */
    public void testGetJudges() {
        
        
        
        
        System.out.println("getJudges");
        
        System.out.println("setJudges");
        String[] judges = new String[10];
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
        
        EMMASimulator instance = new EMMASimulator();
        instance.setJudges(judges);
        String[] ret = instance.getJudges();
        System.out.println("The Judges are as follows:");
        for(int i = 0; i < instance.getJudges().length; i++)
            System.out.println("                    "+ ret[i]);
        assertTrue(judges[0].equals(ret[0]));
        for(int i  = 0;i > judges.length;i++)
        if(judges[i].equals(ret[i]) != true)
            fail("Not working");
        // TODO review the generated test code and remove the default call to fail.
        //fail("The test case is a prototype.");
    }

    /**
     * Test of setRanges method, of class EMMASimulator.
     */
    public void testSetRanges() {
        System.out.println("setRanges");
        int bot = -10;
        int top = 100;
        EMMASimulator instance = new EMMASimulator();
        instance.setRanges(bot, top);
        // TODO review the generated test code and remove the default call to fail.
        if(instance.getBotRange()!= -10)
            fail("Lower value wrong");
        if(instance.getTopRange()!= 100)
            fail("Upper value wrong");
    }

    /**
     * Test of getTopRange method, of class EMMASimulator.
     */
    public void testGetTopRange() {
        System.out.println("getTopRange");
        int bot = -10;
        int top = 100;
        EMMASimulator instance = new EMMASimulator();
        instance.setRanges(bot, top);
        // TODO review the generated test code and remove the default call to fail.

        if(instance.getTopRange()!= 100)
            fail("TopRange wrong");
    }

    /**
     * Test of getBotRange method, of class EMMASimulator.
     */
    public void testGetBotRange() {
        System.out.println("getBotRange");
        int bot = -10;
        int top = 100;
        EMMASimulator instance = new EMMASimulator();
        instance.setRanges(bot, top);
        // TODO review the generated test code and remove the default call to fail.

        if(instance.getBotRange()!= -10)
            fail("botRange wrong");
    }

    /**
     * Test of main method, of class EMMASimulator.
     */
    public void testMain() {
        System.out.println("main");
        //String[] args = null;
        //EMMASimulator.main(args);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }
}
