/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

import java.awt.image.BufferedImage;
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
        String[] judges = new String[5];
        judges[0]= "Johan";
        judges[1]= "Test";
        judges[2]= "Test2";
        judges[3]= "Test3";
        judges[4]= "Test4";
        
        
        EMMASimulator instance = new EMMASimulator();
        instance.setJudges(judges);
        String[] temp = instance.getJudges();
        for(int i = 0; i < judges.length; i++)
            assertEquals(judges[i], temp[i]);
        // TODO review the generated test code and remove the default call to fail.
        
    }

    /**
     * Test of getJudges method, of class EMMASimulator.
     */
    public void testGetJudges() {
        System.out.println("getJudges");
        String[] judges = new String[5];
        judges[0]= "Johan";
        judges[1]= "Test";
        judges[2]= "Test2";
        judges[3]= "Test3";
        judges[4]= "Test4";
        EMMASimulator instance = new EMMASimulator();
        instance.setJudges(judges);
        String[] temp = instance.getJudges();
        for(int i = 0; i < judges.length; i++)
            assertEquals(judges[i], temp[i]);
    }

    /**
     * Test of setRanges method, of class EMMASimulator.
     */
    public void testSetRanges() {
        System.out.println("setRanges");
        int bot = 0;
        int top = 0;
        EMMASimulator instance = new EMMASimulator();
        instance.setRanges(bot, top);
        assertEquals(bot, instance.getBotRange());
        assertEquals(top, instance.getTopRange());
    }

    /**
     * Test of getTopRange method, of class EMMASimulator.
     */
    public void testGetTopRange() {
        System.out.println("getTopRange");
        EMMASimulator instance = new EMMASimulator();
        int expResult = 1000;
        instance.setRanges(10, 1000);
        int result = instance.getTopRange();
        assertEquals(expResult, result);
    }

    /**
     * Test of getBotRange method, of class EMMASimulator.
     */
    public void testGetBotRange() {
        System.out.println("getBotRange");
        EMMASimulator instance = new EMMASimulator();
        int expResult = -1111;
        instance.setRanges(-1111, 1000);
        int result = instance.getBotRange();
        assertEquals(expResult, result);
    }

    /**
     * Test of getTopRange method, of class EMMASimulator.
     */
    public void testSetControll() {
        System.out.println("SetControll");
        EMMASimulator instance = new EMMASimulator();
        Boolean expResult = true;
        instance.setControll(true);
        Boolean result = instance.getControll();
        assertEquals(expResult, result);
        
        expResult = false;
        instance.setControll(false);
        result = instance.getControll();
        assertEquals(expResult, result);
        
        
        
    }
    
    
    /**
     * Test of getTopRange method, of class EMMASimulator.
     */
    public void testGetControll() {
        System.out.println("GetControll");
        EMMASimulator instance = new EMMASimulator();
        Boolean expResult = true;
        instance.setControll(true);
        Boolean result = instance.getControll();
        assertEquals(expResult, result);
        
        expResult = false;
        instance.setControll(false);
        result = instance.getControll();
        assertEquals(expResult, result);
    }
    
    
    
    
    
    /**
     * Test of loadImages method, of class EMMASimulator.
     */
    
    public void testLoadImages() throws Exception {
        System.out.println("loadImages");
        EMMASimulator instance = new EMMASimulator();
        instance.loadImages();
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of getImages method, of class EMMASimulator.
     */
    public void testGetImages() {
        System.out.println("getImages");
        EMMASimulator instance = new EMMASimulator();
        BufferedImage[] expResult = null;
        BufferedImage[] result = instance.getImages();
        assertEquals(expResult, result);
        // TODO review the generated test code and remove the default call to fail.
        fail("The test case is a prototype.");
    }

    /**
     * Test of main method, of class EMMASimulator.
     */

}
