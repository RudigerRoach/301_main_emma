/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import junit.framework.TestCase;
import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import static org.junit.Assert.*;

/**
 *
 * @author Dieter
 */
public class userTest extends TestCase {
    
    public user testuser = null;
    
    public userTest() {
    }
    
    @Before
    @Override
    public void setUp() {
        testuser = new user("123","1234");
    }
    
    @After
    @Override
    public void tearDown() {
    }

    public void userTestObjectUID()
    {
        String test = testuser.getUID();
        assertEquals("Testing if right data is returned","123",test);
    }
    
    public void userTestObjectEmail()
    {
        String test = testuser.getEmail();
        assertEquals("Testing if right data is returned for email","1234",test);
    }
    
    public void userTestObjectSetUID()
    {
        testuser.setUID("321");
        String test = testuser.getUID();
        assertEquals("Testing if right data is returned","321",test);
    }
    
    public void userTestObjectSetEmail()
    {
        testuser.setEmail("321");
        String test = testuser.getEmail();
        assertEquals("Testing if right data is returned","321",test);
    }
}
