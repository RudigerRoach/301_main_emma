/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import static junit.framework.Assert.assertEquals;
import junit.framework.TestCase;
import org.junit.After;
import org.junit.Before;

/**
 *
 * @author Dieter
 */
public class reportGeneratorTest extends TestCase{
    
    private static reportGenerator generator = null;
    
    public reportGeneratorTest() {
    }
    
    @Before
    public void setUp() {
    }
    
    @After
    public void tearDown() {
    }
    
    public void testAverage()
    {
        int [][] scores = new int[3][3];
        String [] names = new String[3];
        for (int i = 0 ; i < 3;i++)
        {
            names[i] = i + "asdf";
            for(int j = 0; j < 3;j++)
            {
                scores[i][j] = 2;
            }
        }
        generator = new averageReport(scores, names);
        
        report temp = generator.generateReport();
        
        String [] temp3 = temp.getNames();
        int [] temp4 = temp.getScores();
        String output = "0asdf 2;1asdf 2;2asdf 2;";
        String output1 = "";
        for(int i = 0; i < 3;i++)
        {
            output1 = output1 + temp3[i] + " " + temp4[i] + ";";
        }
        
        assertEquals("Checking average report generator",output,output1);
    }
    
    public void testSum()
    {
        int [][] scores = new int[3][3];
        String [] names = new String[3];
        for (int i = 0 ; i < 3;i++)
        {
            names[i] = i + "asdf";
            for(int j = 0; j < 3;j++)
            {
                scores[i][j] = 2;
            }
        }
        generator = new sumReport(scores, names);
        
        report temp = generator.generateReport();
        
        String [] temp3 = temp.getNames();
        int [] temp4 = temp.getScores();
        String output = "0asdf 6;1asdf 6;2asdf 6;";
        String output1 = "";
        for(int i = 0; i < 3;i++)
        {
            output1 = output1 + temp3[i] + " " + temp4[i] + ";";
        }
        
        assertEquals("Checking average report generator",output,output1);
    }
}
