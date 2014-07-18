import java.awt.image.BufferedImage;
import java.io.FileNotFoundException;
import junit.framework.TestCase;

public class SessionTest extends TestCase {
    
    public SessionTest(String testName) {
        super(testName);
    }

    /**
     * Test of setJudges method, of class Session.
     */
    public void testSetJudges() {
        System.out.println("setJudges");
        String[] judges = new String[5];
        judges[0]= "Johan";
        judges[1]= "Test";
        judges[2]= "Test2";
        judges[3]= "Test3";
        judges[4]= "Test4";
        
        
        Session instance = new Session();
        instance.setJudges(judges);
        String[] temp = instance.getJudges();
        for(int i = 0; i < judges.length; i++)
            assertEquals(judges[i], temp[i]);
        
    }

    /**
     * Test of testGetSessionType() method, of class Session.
     */
    
    public void testGetSessionType() {
        System.out.println("sessionType");
        
        Session instance = new Session();
        
        instance.setJudges(null);
        String[] temp = instance.getJudges();  
        assertTrue(instance.getSessionType());
        
    }
    
    
    
    /**
     * Test of getJudges method, of class Session.
     */

    public void testGetJudges() {
        System.out.println("getJudges");
        String[] judges = new String[5];
        judges[0]= "Johan";
        judges[1]= "Test";
        judges[2]= "Test2";
        judges[3]= "Test3";
        judges[4]= "Test4";
        Session instance = new Session();
        instance.setJudges(judges);
        String[] temp = instance.getJudges();
        for(int i = 0; i < judges.length; i++)
            assertEquals(judges[i], temp[i]);
    }

    /**
     * Test of setRanges method, of class Session.
     */
    public void testSetRanges() {
        System.out.println("setRanges");
        int bot = 0;
        int top = 0;
        Session instance = new Session();
        instance.setRanges(bot, top);
        assertEquals(bot, instance.getBotRange());
        assertEquals(top, instance.getTopRange());
    }

    /**
     * Test of getTopRange method, of class Session.
     */
    public void testGetTopRange() {
        System.out.println("getTopRange");
        Session instance = new Session();
        int expResult = 1000;
        instance.setRanges(10, 1000);
        int result = instance.getTopRange();
        assertEquals(expResult, result);
    }

    /**
     * Test of getBotRange method, of class Session.
     */
    public void testGetBotRange() {
        System.out.println("getBotRange");
        Session instance = new Session();
        int expResult = -1111;
        instance.setRanges(-1111, 1000);
        int result = instance.getBotRange();
        assertEquals(expResult, result);
    }

    /**
     * Test of getTopRange method, of class Session.
     */
    public void testSetControll() {
        System.out.println("SetControll");
        Session instance = new Session();
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
     * Test of getTopRange method, of class Session.
     */
    public void testGetControll() {
        System.out.println("GetControll");
        Session instance = new Session();
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
     * Test of getAllImageDetails method, of class Session.
     */

    public void testGetAllImageDetails() {
        System.out.println("getAllImageDetails");
        
        Session instance = new Session();
        
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
     * Test of setImageDetails method, of class Session.
     */

    public void testSetImageDetails() {
        System.out.println("setImageDetails");
        
        Session instance = new Session();
        
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
     * Test of getImageDetails method, of class Session.
     */

    public void testGetImageDetails() {
        System.out.println("getImageDetails");
        Session instance = new Session();
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
     * Test of loadImages method, of class Session.
     */
    
    public void testLoadImages() throws Exception {
        System.out.println("loadImages");
        Session instance = new Session();        
        instance.loadImages();
        assertNotNull(instance.getImages());
        
    }

    /**
     * Test of getImages method, of class Session.
     */
    public void testGetImages() throws Exception {
        System.out.println("getImages");
        Session instance = new Session();
        instance.loadImages();
        assertNotNull(instance.getImages());
        
    }
    
}
