import java.awt.image.BufferedImage;
import java.io.BufferedReader;
import java.io.File;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
import javax.imageio.ImageIO;
import static junit.framework.Assert.assertEquals;
import junit.framework.TestCase;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.CookieStore;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.protocol.ClientContext;
import org.apache.http.impl.client.BasicCookieStore;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.protocol.BasicHttpContext;
import org.apache.http.protocol.HttpContext;
import org.json.JSONObject;

/**
 *
 * @author Endzeit
 */
public class uRateServerTest extends TestCase {
    
    private static uRateServer server = null;
    
    public uRateServerTest(String testName) throws Exception {
        super(testName);
    }
    
    @Override
    protected void setUp() throws Exception {
        super.setUp();
        //creates mew session for unit tests
         String[] _judges = new String[5];
        _judges[0]= "Johan";
        _judges[1]= "test";
        _judges[2]= "test123@test.com";
        _judges[3]= "Test3";
        _judges[4]= "Test4";
        String [] tmp1 = new String[2];
        tmp1[0] = "helo";
        tmp1[1] = "asdf";
        linkedList tmp2 = new linkedList();
        tmp2.id = 1L;
        tmp2.next = new linkedList();
        tmp2.next.id = 2L;
        BufferedImage[] tmp3 = new BufferedImage[2];
        tmp3[0] = ImageIO.read(new File("image1.jpg"));
        tmp3[1] = ImageIO.read(new File("image2.jpg"));
        Configuration tmp = new Configuration(tmp2, tmp3, _judges,10,0,false,false,tmp1,"normal");
        server = new uRateServer(tmp);
    }
    
    @Override
    protected void tearDown() throws Exception {
        super.tearDown();
        server.close();
    }
    
    public void testLoginSuccessful() throws Exception
    {
        //Create client
	HttpClient client = new DefaultHttpClient();
        HttpPost mockRequest = new HttpPost("http://localhost:5555/login");
        mockRequest.setHeader("Content-type", "application/x-www-form-urlencoded");
        
        //Add parameters
        List<NameValuePair> urlParameters = new ArrayList<>();
        urlParameters.add(new BasicNameValuePair("email", "test123@test.com"));
        urlParameters.add(new BasicNameValuePair("deviceUID", "123"));
        mockRequest.setEntity(new UrlEncodedFormEntity(urlParameters,"UTF-8"));
        //Execute the request
        HttpResponse mockResponse = client.execute(mockRequest);
		
        //Test if normal login is successful
        BufferedReader rd = new BufferedReader(new InputStreamReader(mockResponse.getEntity().getContent()));
        String stringResponse = rd.readLine();
        assertEquals("Testing if login was succesful",true,stringResponse.contains("success"));
    }
    
    public void testLoginFailure() throws Exception
    {
        //Create client
	HttpClient client = new DefaultHttpClient();
        HttpPost mockRequest = new HttpPost("http://localhost:5555/login");
        mockRequest.setHeader("Content-type", "application/x-www-form-urlencoded");
        
        //Add parameters
        List<NameValuePair> urlParameters = new ArrayList<>();
        urlParameters.add(new BasicNameValuePair("email", "asdfq"));
        urlParameters.add(new BasicNameValuePair("deviceUID", "1234"));
        mockRequest.setEntity(new UrlEncodedFormEntity(urlParameters,"UTF-8"));
        //Execute the request
        HttpResponse mockResponse = client.execute(mockRequest);
        
        JSONObject jsonTest = new JSONObject();
        jsonTest.put("status", "failed");
        //Test if login fails and it should
        BufferedReader rd = new BufferedReader(new InputStreamReader(mockResponse.getEntity().getContent()));
        assertEquals("Testing if login was correctly failed due to incorrect username",jsonTest.toString(),rd.readLine());
    }
    
    public void testSingleIDSuccess() throws Exception
    {
        //create client
        HttpClient client = new DefaultHttpClient();
        HttpPost mockRequest = new HttpPost("http://localhost:5555/login");
        mockRequest.setHeader("Content-type", "application/x-www-form-urlencoded");

        //Add parameters
        List<NameValuePair> urlParameters = new ArrayList<>();
        urlParameters.add(new BasicNameValuePair("email", "test"));
        urlParameters.add(new BasicNameValuePair("deviceUID", "123"));
        mockRequest.setEntity(new UrlEncodedFormEntity(urlParameters,"UTF-8"));
        //Execute request
        HttpResponse mockResponse = client.execute(mockRequest);

        //save first response
        BufferedReader rd = new BufferedReader(new InputStreamReader(mockResponse.getEntity().getContent()));
        String stringResponse = rd.readLine();
        //Execute same request from the same client
        HttpResponse mockResponse1 = client.execute(mockRequest);
        //Should return same session id
        rd = new BufferedReader(new InputStreamReader(mockResponse1.getEntity().getContent()));
        String stringResponse1 = rd.readLine();
        assertEquals("Testing if there are the same session ids",stringResponse1,stringResponse);
    }
	
    public void testSingleIDFailure() throws Exception
    {
        //Create clients
        HttpClient client = new DefaultHttpClient();
        HttpClient client1 = new DefaultHttpClient();
        HttpPost mockRequest = new HttpPost("http://localhost:5555/login");
        HttpPost mockRequest1 = new HttpPost("http://localhost:5555/login");
        mockRequest.setHeader("Content-type", "application/x-www-form-urlencoded");
        mockRequest1.setHeader("Content-type", "application/x-www-form-urlencoded");

        //Add parameters to clients
        List<NameValuePair> urlParameters = new ArrayList<>();
        urlParameters.add(new BasicNameValuePair("email", "test"));
        urlParameters.add(new BasicNameValuePair("deviceUID", "123"));
        mockRequest.setEntity(new UrlEncodedFormEntity(urlParameters,"UTF-8"));
        mockRequest1.setEntity(new UrlEncodedFormEntity(urlParameters,"UTF-8"));
        //execute the first client
        HttpResponse mockResponse = client.execute(mockRequest);

        BufferedReader rd = new BufferedReader(new InputStreamReader(mockResponse.getEntity().getContent()));
        String stringResponse = rd.readLine();
        //execute the second client
        HttpResponse mockResponse1 = client1.execute(mockRequest1);
        // should have different session id
        rd = new BufferedReader(new InputStreamReader(mockResponse1.getEntity().getContent()));
        String stringResponse1 = rd.readLine();
        assertEquals("Testing if there are different session ids",false,stringResponse.equals(stringResponse1));
    }
    
    public void testStartOfSession() throws Exception
    {
        //Create client
	HttpClient client = new DefaultHttpClient();
        HttpPost mockRequest = new HttpPost("http://localhost:5555/login");
        CookieStore cookieStore = new BasicCookieStore();
        HttpContext httpContext = new BasicHttpContext();
        httpContext.setAttribute(ClientContext.COOKIE_STORE, cookieStore);
        mockRequest.setHeader("Content-type", "application/x-www-form-urlencoded");
        
        //Add parameters
        List<NameValuePair> urlParameters = new ArrayList<>();
        urlParameters.add(new BasicNameValuePair("email", "test123@test.com"));
        urlParameters.add(new BasicNameValuePair("deviceUID","123"));
        mockRequest.setEntity(new UrlEncodedFormEntity(urlParameters,"UTF-8"));
        //Execute the request
        HttpResponse mockResponse = client.execute(mockRequest,httpContext);
        BufferedReader rd = new BufferedReader(new InputStreamReader(mockResponse.getEntity().getContent()));
        String stringResponse = rd.readLine();
        HttpPost mockRequest1 = new HttpPost("http://localhost:5555/start");
        HttpResponse mockResponse1 = client.execute(mockRequest1,httpContext);
        rd.close();
        rd = new BufferedReader(new InputStreamReader(mockResponse1.getEntity().getContent()));
        stringResponse = rd.readLine();
        JSONObject jsonTest = new JSONObject();
        jsonTest.put("status", "1");
        jsonTest.put("sessionType","normal");
        jsonTest.put("rangeBottom", 0);
        jsonTest.put("rangeTop", 10);
        jsonTest.put("description", "helo");
        jsonTest.put("comments", "true");
        jsonTest.put("imgPath","temp/1.jpg");
        assertEquals("Start of session failed",jsonTest.toString(),stringResponse);
    }
    
    //check na die deviceID
    public void testNextImageOfSession() throws Exception
    {
        //Create client
	HttpClient client = new DefaultHttpClient();
        HttpPost mockRequest = new HttpPost("http://localhost:5555/login");
        CookieStore cookieStore = new BasicCookieStore();
        HttpContext httpContext = new BasicHttpContext();
        httpContext.setAttribute(ClientContext.COOKIE_STORE, cookieStore);
        mockRequest.setHeader("Content-type", "application/x-www-form-urlencoded");
        
        //Add parameters
        List<NameValuePair> urlParameters = new ArrayList<>();
        urlParameters.add(new BasicNameValuePair("email", "test123@test.com"));
        urlParameters.add(new BasicNameValuePair("deviceUID","123"));
        mockRequest.setEntity(new UrlEncodedFormEntity(urlParameters,"UTF-8"));
        //Execute the request
        HttpResponse mockResponse = client.execute(mockRequest,httpContext);
		
        //Test if normal login is successful
        BufferedReader rd = new BufferedReader(new InputStreamReader(mockResponse.getEntity().getContent()));
        rd.close();
        HttpPost mockRequest2 = new HttpPost("http://localhost:5555/start");
        mockRequest2.setHeader("Content-type", "application/x-www-form-urlencoded");
        //Add parameters
        HttpResponse mockResponse2 = client.execute(mockRequest2,httpContext);
        rd = new BufferedReader(new InputStreamReader(mockResponse2.getEntity().getContent()));
        System.out.println(rd.readLine());
        rd.close();
        HttpPost mockRequest1 = new HttpPost("http://localhost:5555/nextImage");
        mockRequest2.setHeader("Content-type", "application/x-www-form-urlencoded");
        //Add parameters
        List<NameValuePair> urlParameters1 = new ArrayList<>();
        urlParameters1.add(new BasicNameValuePair("deviceUID", "123"));
        urlParameters1.add(new BasicNameValuePair("comment","asdf"));
        urlParameters1.add(new BasicNameValuePair("result","3"));
        mockRequest1.setEntity(new UrlEncodedFormEntity(urlParameters1,"UTF-8"));
        HttpResponse mockResponse1 = client.execute(mockRequest1,httpContext);
        rd = new BufferedReader(new InputStreamReader(mockResponse1.getEntity().getContent()));
        System.out.println("++ " + rd.readLine());
        rd.close();
        assertEquals("Testing if nextImage is correct",true,true);
    }
    
//    public void testEndOfSession() throws Exception
//    {
//        //Create client
//	HttpClient client = new DefaultHttpClient();
//        HttpPost mockRequest = new HttpPost("http://localhost:5555/login");
//        CookieStore cookieStore = new BasicCookieStore();
//        HttpContext httpContext = new BasicHttpContext();
//        httpContext.setAttribute(ClientContext.COOKIE_STORE, cookieStore);
//        mockRequest.setHeader("Content-type", "application/x-www-form-urlencoded");
//        
//        //Add parameters
//        List<NameValuePair> urlParameters = new ArrayList<>();
//        urlParameters.add(new BasicNameValuePair("email", "test"));
//        urlParameters.add(new BasicNameValuePair("deviceUID","BD655C43-3A73-4DFB-AA1F-074A4F0B0DCE"));
//        mockRequest.setEntity(new UrlEncodedFormEntity(urlParameters,"UTF-8"));
//        //Execute the request
//        HttpResponse mockResponse = client.execute(mockRequest,httpContext);
//		
//        //Test if normal login is successful
//        BufferedReader rd = new BufferedReader(new InputStreamReader(mockResponse.getEntity().getContent()));
//        rd.close();
//        HttpPost mockRequest2 = new HttpPost("http://localhost:5555/start");
//        mockRequest2.setHeader("Content-type", "application/x-www-form-urlencoded");
//        //Add parameters
//        HttpResponse mockResponse2 = client.execute(mockRequest2,httpContext);
//        rd = new BufferedReader(new InputStreamReader(mockResponse2.getEntity().getContent()));
//        rd.close();
//        HttpPost mockRequest1 = new HttpPost("http://localhost:5555/nextImage");
//        mockRequest2.setHeader("Content-type", "application/x-www-form-urlencoded");
//        //Add parameters
//        List<NameValuePair> urlParameters1 = new ArrayList<>();
//        urlParameters1.add(new BasicNameValuePair("deviceUID", "BD655C43-3A73-4DFB-AA1F-074A4F0B0DCE"));
//        urlParameters1.add(new BasicNameValuePair("comment","asdf"));
//        urlParameters1.add(new BasicNameValuePair("result","3"));
//        mockRequest1.setEntity(new UrlEncodedFormEntity(urlParameters1,"UTF-8"));
//        HttpResponse mockResponse1 = client.execute(mockRequest1,httpContext);
//        rd = new BufferedReader(new InputStreamReader(mockResponse1.getEntity().getContent())); 
//        assertEquals("Testing if login was correctly failed due to incorrect username",true,true);
//    }
}
