/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import java.awt.image.BufferedImage;
import java.io.BufferedReader;
import java.io.File;
import java.io.InputStreamReader;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import javax.imageio.ImageIO;
import static junit.framework.Assert.assertEquals;
import junit.framework.TestCase;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.CookieStore;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.fluent.Async;
import org.apache.http.client.fluent.Content;
import org.apache.http.client.fluent.Request;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.protocol.ClientContext;
import org.apache.http.impl.client.BasicCookieStore;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.protocol.BasicHttpContext;
import org.apache.http.protocol.HttpContext;
import org.apache.http.concurrent.FutureCallback;
import org.json.JSONObject;

/**
 *
 * @author Dieter
 */
public class MinimalServerTest extends TestCase {
    
    private static MinimalServer server = null;
    
    public MinimalServerTest(String testName) throws Exception {
        super(testName);
    }
    
    @Override
    protected void setUp() throws Exception {
        super.setUp();
        //creates mew session for unit tests
         String[] _judges = new String[5];
        _judges[0]= "Johan";
        _judges[1]= "test";
        _judges[2]= "test123";
        _judges[3]= "Test3";
        _judges[4]= "Test4";
        String [] tmp1 = new String[1];
        tmp1[0] = "helo";
        linkedList tmp2 = new linkedList();
        tmp2.info = "stellies.jpg";
        BufferedImage[] tmp3 = new BufferedImage[1];
        tmp3[0] = ImageIO.read(new File("stellies.jpg"));
        Session tmp = new Session(tmp2, tmp3, _judges,10,0,false,true,tmp1);
        server = new MinimalServer(tmp);
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
        urlParameters.add(new BasicNameValuePair("email", "test123"));
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
        urlParameters.add(new BasicNameValuePair("deviceUID", "123"));
        mockRequest.setEntity(new UrlEncodedFormEntity(urlParameters,"UTF-8"));
        //Execute the request
        HttpResponse mockResponse = client.execute(mockRequest);
        
        JSONObject jsonTest = new JSONObject();
        jsonTest.put("status", "failed");
        //Test if login fails and it should
        BufferedReader rd = new BufferedReader(new InputStreamReader(mockResponse.getEntity().getContent()));
        assertEquals("Testing if login was correctly failed due to incorrect username",jsonTest.toString(),rd.readLine());
    }
    
    public void testAutoLoginSuccessful() throws Exception
    {
	//Create client
	HttpClient client = new DefaultHttpClient();
        HttpPost mockRequest = new HttpPost("http://localhost:5555/login");
        mockRequest.setHeader("Content-type", "application/x-www-form-urlencoded");
        
        //Add parameters
        List<NameValuePair> urlParameters = new ArrayList<>();
        urlParameters.add(new BasicNameValuePair("deviceUID", "BD655C43-3A73-4DFB-AA1F-074A4F0B0DCE"));
        mockRequest.setEntity(new UrlEncodedFormEntity(urlParameters,"UTF-8"));
        //Execute the request
        HttpResponse mockResponse = client.execute(mockRequest);
		
        //Test if auto login is successful
        BufferedReader rd = new BufferedReader(new InputStreamReader(mockResponse.getEntity().getContent()));
        String stringResponse = rd.readLine();
        assertEquals("Testing if auto login was succesful",true,stringResponse.contains("success"));
    }
	
    public void testAutoLoginFailure() throws Exception
    {
        //Create client
        HttpClient client = new DefaultHttpClient();
        HttpPost mockRequest = new HttpPost("http://localhost:5555/login");
        mockRequest.setHeader("Content-type", "application/x-www-form-urlencoded");
        
        //Add parameters
        List<NameValuePair> urlParameters = new ArrayList<>();
        urlParameters.add(new BasicNameValuePair("deviceUID", "123123141241212"));
        mockRequest.setEntity(new UrlEncodedFormEntity(urlParameters,"UTF-8"));
        //Execute the request
        HttpResponse mockResponse = client.execute(mockRequest);
		
        //Test if auto login fails and it should
        BufferedReader rd = new BufferedReader(new InputStreamReader(mockResponse.getEntity().getContent()));
        String stringResponse = rd.readLine();
        assertEquals("Testing if auto login has failed",true,stringResponse.contains("failed"));
    }
    
    public void testSingleSignOnSuccess() throws Exception
    {
        //create client
        HttpClient client = new DefaultHttpClient();
        HttpPost mockRequest = new HttpPost("http://localhost:5555/login");
        mockRequest.setHeader("Content-type", "application/x-www-form-urlencoded");

        //Add parameters
        List<NameValuePair> urlParameters = new ArrayList<>();
        urlParameters.add(new BasicNameValuePair("email", "test"));
        urlParameters.add(new BasicNameValuePair("deviceUID", "BD655C43-3A73-4DFB-AA1F-074A4F0B0DCE"));
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
	
    public void testSingleSignOnFailure() throws Exception
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
        urlParameters.add(new BasicNameValuePair("deviceUID", "BD655C43-3A73-4DFB-AA1F-074A4F0B0DCE"));
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
    
    public void testNotification() throws Exception
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
        urlParameters.add(new BasicNameValuePair("email", "test"));
        urlParameters.add(new BasicNameValuePair("deviceUID","BD655C43-3A73-4DFB-AA1F-074A4F0B0DCE"));
        mockRequest.setEntity(new UrlEncodedFormEntity(urlParameters,"UTF-8"));
        //Execute the request
        HttpResponse mockResponse = client.execute(mockRequest,httpContext);
		
        //Test if normal login is successful
        BufferedReader rd = new BufferedReader(new InputStreamReader(mockResponse.getEntity().getContent()));
        rd.close();
        URL newURL = new URL("http://127.0.0.1:5555/start");
        final Request request = Request.Post(newURL.toURI());
        ExecutorService executor = Executors.newFixedThreadPool(1);
        Async async = Async.newInstance().use(executor);
        Future<Content> future = async.execute(request, new FutureCallback<Content>(){
            @Override
            public void failed(final Exception e){
                e.printStackTrace();
            }
            
            @Override
            public void completed(final Content content){
                System.out.println("Done");
            }
            @Override
            public void cancelled (){
                
            }
        });
        
        server.startSession();
        String asyncResponse = future.get().asString();
        JSONObject jsonTest = new JSONObject();
        //                "status": "1", //0 if the app should keep waiting, 1 for success, 2 if the votong session has fininshed
//		        "sessionType": "normal", //alternatively Yes/No or winner
//		        "rangeBottom": "0",
//		        "rangeTop": "15",
//		        "description": "image discription here",
//		        "comments": "True",  //True if comments are allowed, False if not
//		        "imgPath": "path/to/image.jpg" //the path where the image resides on the server
        jsonTest.put("status", "1");
        jsonTest.put("sessionType","normal");
        jsonTest.put("rangeBottom", 0);
        jsonTest.put("rangeTop", 10);
        jsonTest.put("description", "helo");
        jsonTest.put("comments", "true");
        jsonTest.put("imgPath","temp/1.jpg");
        assertEquals("Testing if login was correctly failed due to incorrect username",jsonTest.toString(),asyncResponse);
    }
}
