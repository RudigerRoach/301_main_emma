import java.awt.image.BufferedImage;
import java.io.FileNotFoundException;
import junit.framework.TestCase;

public class JudgingSessionTest extends TestCase {
    
    public JudgingSessionTest(String testName) {
        super(testName);
    }

    /**
     * Test of setJudges method, of class JudgingSession.
     */
    public void testSetJudges() {
        System.out.println("setJudges");
        String[] judges = new String[5];
        judges[0]= "Johan";
        judges[1]= "Test";
        judges[2]= "Test2";
        judges[3]= "Test3";
        judges[4]= "Test4";
        
        
        JudgingSession instance = new JudgingSession();
        instance.setJudges(judges);
        String[] temp = instance.getJudges();
        for(int i = 0; i < judges.length; i++)
            assertEquals(judges[i], temp[i]);
        
    }

    /**
     * Test of testGetSessionType() method, of class JudgingSession.
     */
    
    public void testGetSessionType() {
        System.out.println("sessionType");
        
        JudgingSession instance = new JudgingSession();
        
        instance.setJudges(null);
        String[] temp = instance.getJudges();  
        assertTrue(instance.getSessionType());
        
    }
    
    
    
    /**
     * Test of getJudges method, of class JudgingSession.
     */

    public void testGetJudges() {
        System.out.println("getJudges");
        String[] judges = new String[5];
        judges[0]= "Johan";
        judges[1]= "Test";
        judges[2]= "Test2";
        judges[3]= "Test3";
        judges[4]= "Test4";
        JudgingSession instance = new JudgingSession();
        instance.setJudges(judges);
        String[] temp = instance.getJudges();
        for(int i = 0; i < judges.length; i++)
            assertEquals(judges[i], temp[i]);
    }

    /**
     * Test of setRanges method, of class JudgingSession.
     */
    public void testSetRanges() {
        System.out.println("setRanges");
        int bot = 0;
        int top = 0;
        JudgingSession instance = new JudgingSession();
        instance.setRanges(bot, top);
        assertEquals(bot, instance.getBotRange());
        assertEquals(top, instance.getTopRange());
    }

    /**
     * Test of getTopRange method, of class JudgingSession.
     */
    public void testGetTopRange() {
        System.out.println("getTopRange");
        JudgingSession instance = new JudgingSession();
        int expResult = 1000;
        instance.setRanges(10, 1000);
        int result = instance.getTopRange();
        assertEquals(expResult, result);
    }

    /**
     * Test of getBotRange method, of class JudgingSession.
     */
    public void testGetBotRange() {
        System.out.println("getBotRange");
        JudgingSession instance = new JudgingSession();
        int expResult = -1111;
        instance.setRanges(-1111, 1000);
        int result = instance.getBotRange();
        assertEquals(expResult, result);
    }

    /**
     * Test of getTopRange method, of class JudgingSession.
     */
    public void testSetControll() {
        System.out.println("SetControll");
        JudgingSession instance = new JudgingSession();
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
     * Test of getTopRange method, of class JudgingSession.
     */
    public void testGetControll() {
        System.out.println("GetControll");
        JudgingSession instance = new JudgingSession();
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
     * Test of getAllImageDetails method, of class JudgingSession.
     */

    public void testGetAllImageDetails() {
        System.out.println("getAllImageDetails");
        
        JudgingSession instance = new JudgingSession();
        
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
     * Test of setImageDetails method, of class JudgingSession.
     */

    public void testSetImageDetails() {
        System.out.println("setImageDetails");
        
        JudgingSession instance = new JudgingSession();
        
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
     * Test of getImageDetails method, of class JudgingSession.
     */

    public void testGetImageDetails() {
        System.out.println("getImageDetails");
        JudgingSession instance = new JudgingSession();
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
     * Test of loadImages method, of class JudgingSession.
     */
    
    public void testLoadImages() throws Exception {
        System.out.println("loadImages");
        JudgingSession instance = new JudgingSession();        
        instance.loadImages();
        assertNotNull(instance.getImages());
        
    }

    /**
     * Test of getImages method, of class JudgingSession.
     */
    public void testGetImages() throws Exception {
        System.out.println("getImages");
        JudgingSession instance = new JudgingSession();
        instance.loadImages();
        assertNotNull(instance.getImages());
        
    }
    
}
