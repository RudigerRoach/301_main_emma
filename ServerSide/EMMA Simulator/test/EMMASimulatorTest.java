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
        
    }

    /**
     * Test of testGetSessionType() method, of class EMMASimulator.
     */
    
    public void testGetSessionType() {
        System.out.println("sessionType");
        
        EMMASimulator instance = new EMMASimulator();
        
        instance.setJudges(null);
        String[] temp = instance.getJudges();  
        assertTrue(instance.getSessionType());
        
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
     * Test of setAllImageDetails method, of class EMMASimulator.
     */

    public void testSetAllImageDetails() {
        System.out.println("setAllImageDetails");
        
        EMMASimulator instance = new EMMASimulator();
        
        String[] test = new String[5];
        test[0] = "Photo of a big bird";
        test[1] = "Photo of a surfer";
        test[2] = "Photo of a rock";
        test[3] = "Photo of a girl";
        test[4] = "Photo of a stick";
        
        instance.setAllImageDetails(test);
        String[] ret = instance.getAllImageDetails();    
        for(int i = 0; i < 5; i++)
            assertEquals(test[i], instance.getImageDetails(i));
        
        
    }
    
    /**
     * Test of getAllImageDetails method, of class EMMASimulator.
     */

    public void testGetAllImageDetails() {
        System.out.println("getAllImageDetails");
        
        EMMASimulator instance = new EMMASimulator();
        
        String[] test = new String[5];
        test[0] = "Photo of a big bird";
        test[1] = "Photo of a surfer";
        test[2] = "Photo of a rock";
        test[3] = "Photo of a girl";
        test[4] = "Photo of a stick";
        
        instance.setAllImageDetails(test);
        String[] ret = instance.getAllImageDetails();    
        for(int i = 0; i < 5; i++)
            assertEquals(ret[i], test[i]);
        
    }
    
    /**
     * Test of setImageDetails method, of class EMMASimulator.
     */

    public void testSetImageDetails() {
        System.out.println("setImageDetails");
        
        EMMASimulator instance = new EMMASimulator();
        
        String[] test = new String[5];
        test[0] = "Photo of a big bird";
        test[1] = "Photo of a surfer";
        test[2] = "Photo of a rock";
        test[3] = "Photo of a girl";
        test[4] = "Photo of a stick";
        
        instance.setAllImageDetails(test);
        instance.setImageDetails(1, "testing"); 
        assertEquals("testing", instance.getImageDetails(1));
        
    }
    
    /**
     * Test of getImageDetails method, of class EMMASimulator.
     */

    public void testGetImageDetails() {
        System.out.println("getImageDetails");
        EMMASimulator instance = new EMMASimulator();
        String[] test = new String[5];
        test[0] = "Photo of a big bird";
        test[1] = "Photo of a surfer";
        test[2] = "Photo of a rock";
        test[3] = "Photo of a girl";
        test[4] = "Photo of a stick";
        
        instance.setAllImageDetails(test);
        String[] ret = instance.getAllImageDetails();    
        for(int i = 0; i < 5; i++)
            assertEquals(test[i], instance.getImageDetails(i));
        
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
    
    
}
