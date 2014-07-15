package example.server;

import static org.junit.Assert.assertEquals;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicNameValuePair;
import org.json.JSONObject;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

@SuppressWarnings("deprecation")
public class MinimalServerTest 
{	
	private static MinimalServer server = null;
	
	@Before
	public void testSetup() throws Exception
	{
		server = new MinimalServer();
	}

	@After
	public void testCleanup() throws Exception
	{
		server.close();
	}

	@SuppressWarnings("resource")
	@Test
	public void testLoginSuccessful() throws Exception
	{
		//Create client
		HttpClient client = new DefaultHttpClient();
        HttpPost mockRequest = new HttpPost("http://localhost:5555/login");
        mockRequest.setHeader("Content-type", "application/x-www-form-urlencoded");
        
        //Add parameters
        List<NameValuePair> urlParameters = new ArrayList<NameValuePair>();
        urlParameters.add(new BasicNameValuePair("email", "test"));
        urlParameters.add(new BasicNameValuePair("deviceUID", "123"));
        mockRequest.setEntity(new UrlEncodedFormEntity(urlParameters,"UTF-8"));
        //Execute the request
        HttpResponse mockResponse = client.execute(mockRequest);
		
        //Test if normal login is successful
		BufferedReader rd = new BufferedReader(new InputStreamReader(mockResponse.getEntity().getContent()));
		String stringResponse = rd.readLine();
        assertEquals("Testing if login was succesful",true,stringResponse.contains("success"));
    }
	
	@SuppressWarnings("resource")
	@Test
	public void testAutoLoginSuccessful() throws Exception
	{
		//Create client
		HttpClient client = new DefaultHttpClient();
        HttpPost mockRequest = new HttpPost("http://localhost:5555/login");
        mockRequest.setHeader("Content-type", "application/x-www-form-urlencoded");
        
        //Add parameters
        List<NameValuePair> urlParameters = new ArrayList<NameValuePair>();
        urlParameters.add(new BasicNameValuePair("deviceUID", "BD655C43-3A73-4DFB-AA1F-074A4F0B0DCE"));
        mockRequest.setEntity(new UrlEncodedFormEntity(urlParameters,"UTF-8"));
        //Execute the request
        HttpResponse mockResponse = client.execute(mockRequest);
		
        //Test if auto login is successful
		BufferedReader rd = new BufferedReader(new InputStreamReader(mockResponse.getEntity().getContent()));
		String stringResponse = rd.readLine();
        assertEquals("Testing if auto login was succesful",true,stringResponse.contains("success"));
    }
	
	@SuppressWarnings("resource")
	@Test
	public void testAutoLoginFailure() throws Exception
	{
		//Create client
		HttpClient client = new DefaultHttpClient();
        HttpPost mockRequest = new HttpPost("http://localhost:5555/login");
        mockRequest.setHeader("Content-type", "application/x-www-form-urlencoded");
        
        //Add parameters
        List<NameValuePair> urlParameters = new ArrayList<NameValuePair>();
        urlParameters.add(new BasicNameValuePair("deviceUID", "123"));
        mockRequest.setEntity(new UrlEncodedFormEntity(urlParameters,"UTF-8"));
        //Execute the request
        HttpResponse mockResponse = client.execute(mockRequest);
		
        //Test if auto login fails and it should
		BufferedReader rd = new BufferedReader(new InputStreamReader(mockResponse.getEntity().getContent()));
		String stringResponse = rd.readLine();
        assertEquals("Testing if auto login has failed",true,stringResponse.contains("failed"));
    }
	
	@SuppressWarnings("resource")
	@Test
	public void testLoginFailure() throws Exception
	{
		//Create client
		HttpClient client = new DefaultHttpClient();
        HttpPost mockRequest = new HttpPost("http://localhost:5555/login");
        mockRequest.setHeader("Content-type", "application/x-www-form-urlencoded");
        
        //Add parameters
        List<NameValuePair> urlParameters = new ArrayList<NameValuePair>();
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
	
	@SuppressWarnings("resource")
	@Test
	public void testSingleSignOnSuccess() throws Exception
	{
		//create client
		HttpClient client = new DefaultHttpClient();
	    HttpPost mockRequest = new HttpPost("http://localhost:5555/login");
	    mockRequest.setHeader("Content-type", "application/x-www-form-urlencoded");
	    
	    //Add parameters
	    List<NameValuePair> urlParameters = new ArrayList<NameValuePair>();
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
	
	@SuppressWarnings("resource")
	@Test
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
	    List<NameValuePair> urlParameters = new ArrayList<NameValuePair>();
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
}
