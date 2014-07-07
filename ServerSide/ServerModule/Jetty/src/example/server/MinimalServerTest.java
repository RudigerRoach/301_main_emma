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
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.servlet.ServletContextHandler;
import org.eclipse.jetty.servlet.ServletHolder;
import org.json.JSONObject;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

@SuppressWarnings("deprecation")
public class MinimalServerTest 
{	
	private static Server server = null;
	
	@Before
	public void testSetup() throws Exception
	{
		server = new Server(9090);
		server.setStopAtShutdown(true);
		ServletContextHandler context = new ServletContextHandler(ServletContextHandler.SESSIONS);
		context.setContextPath("/");
		server.setHandler(context);
		MinimalServer testServer = new MinimalServer();
		MinimalServer.LoginServlet testLoginServlet = testServer.new LoginServlet();
		context.addServlet(new ServletHolder(testLoginServlet), "/login");
        server.start();
	}

	@After
	public void testCleanup() throws Exception
	{
		server.stop();
	}

	@SuppressWarnings("resource")
	@Test
	public void testLoginSuccessful() throws Exception
	{
			HttpClient client = new DefaultHttpClient();
	        HttpPost mockRequest = new HttpPost("http://localhost:9090/login");
	        mockRequest.setHeader("Content-type", "application/x-www-form-urlencoded");
	        
	        List<NameValuePair> urlParameters = new ArrayList<NameValuePair>();
	        urlParameters.add(new BasicNameValuePair("email", "test"));
	        urlParameters.add(new BasicNameValuePair("deviceUID", "123"));
	        mockRequest.setEntity(new UrlEncodedFormEntity(urlParameters,"UTF-8"));
	        HttpResponse mockResponse = client.execute(mockRequest);
			
			BufferedReader rd = new BufferedReader(new InputStreamReader(mockResponse.getEntity().getContent()));
			String stringResponse = rd.readLine();
	        assertEquals("Testing if login was succesful",true,stringResponse.contains("success"));
    }
	
	@SuppressWarnings("resource")
	@Test
	public void testLoginFailure() throws Exception
	{
		HttpClient client = new DefaultHttpClient();
        HttpPost mockRequest = new HttpPost("http://localhost:9090/login");
        mockRequest.setHeader("Content-type", "application/x-www-form-urlencoded");
        
        List<NameValuePair> urlParameters = new ArrayList<NameValuePair>();
        urlParameters.add(new BasicNameValuePair("email", "asdfq"));
        urlParameters.add(new BasicNameValuePair("deviceUID", "123"));
        mockRequest.setEntity(new UrlEncodedFormEntity(urlParameters,"UTF-8"));
        HttpResponse mockResponse = client.execute(mockRequest);
        
        JSONObject jsonTest = new JSONObject();
        jsonTest.put("status", "failed");
		
		BufferedReader rd = new BufferedReader(new InputStreamReader(mockResponse.getEntity().getContent()));
        assertEquals("Testing if login was correctly failed due to incorrect username",jsonTest.toString(),rd.readLine());
	}
}
