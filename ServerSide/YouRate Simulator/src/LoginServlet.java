
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.json.JSONException;
import org.json.JSONObject;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author Dieter
 */
public class LoginServlet extends HttpServlet 
{
    /**
     * Overrides the post method to do post communication
         * @param request
         * @param response
         * @throws javax.servlet.ServletException
         * @throws java.io.IOException
     */
    @Override
    //Handle post requests
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
    {   
        Database database = new DBAccess();
        database.open();
        //Get post parameters
        String user = request.getParameter("email");
        String id = request.getParameter("deviceUID");
        //test if new login
        if(user != null)
        {
            boolean loginSuccess = false;

            //Getting judges from emma
            if(uRateServer.session.getSessionType() == true)
            {
                loginSuccess = true;
            }
            else
            {
                String [] judges = uRateServer.session.getJudges();
                if (judges != null)
                {
                    for (String judge : judges) 
                    {
                        if (user.equals(judge)) 
                        {
                            loginSuccess = true;
                        }
                    }
                }
            }

            //Successful login
            if (loginSuccess == true)
            {
                boolean userExist = database.userExists(user);

                if(userExist == false)
                {
                    boolean deviceIDExist = database.deviceExists(id);
                    if(deviceIDExist == false)
                    {
                        database.insert(user, id);
                    }
                    else
                    {
                        database.update(user, id);;
                    }
                }
                else
                {
                    boolean bothInSameRecord = database.shouldAutoLogin(user, id);

                    if(bothInSameRecord == false)
                    {
                        database.update(user, id);
                    }
                }
                JSONObject jsonResponse = new JSONObject();
                try 
                {
                    jsonResponse.put("status", "success");
                    jsonResponse.put("session_id", request.getSession().getId());
                    boolean tempAllowed = true;
                    if(uRateServer.judgesList != null)
                    {
                        for (Judge judgesList : uRateServer.judgesList)
                        {
                            if(judgesList.getJudgeName().equals(user) == true)
                            {
                                tempAllowed = false;
                            }
                        }
                    }
                    if(tempAllowed)
                    {
                        uRateServer.judgesList.add(new Judge(user));
                    }
                } 
                catch (JSONException e) 
                {
                    e.printStackTrace();
                }

                //response to successful login
                response.setContentType("application/json;charset=UTF-8");
                response.getWriter().print(jsonResponse);
            }
            //Login fails
            else
            {
                JSONObject jsonResponse = new JSONObject();
                try 
                {
                    jsonResponse.put("status", "failed");
                } 
                catch (JSONException e) 
                {
                    e.printStackTrace();
                }

                //response to failed login
                response.setContentType("application/json;charset=UTF-8");
                response.getWriter().print(jsonResponse);
            }
        }
        else //test if it is auto login
        {
            //if no parameters are sent through
            if(id == null)
            {
                id = "";
            }
            String userAuto= "";
            boolean loginSuccess = false;

            userAuto = database.getMail(id);
            //get the judges from emma
            if(uRateServer.session.getSessionType() == true)
            {
                loginSuccess = true;
            }
            else
            {
                String [] judges = uRateServer.session.getJudges();
                if (judges != null)
                {
                    for (String judge : judges) 
                    {
                        if (userAuto.equals(judge)) 
                        {
                            loginSuccess = true;
                        }
                    }
                }
            }

            //successFull autoLogin
            if (loginSuccess == true)
            {
                JSONObject jsonResponse = new JSONObject();
                try 
                {
                    jsonResponse.put("status", "success");
                    jsonResponse.put("session_id", request.getSession().getId());
                    String email = database.getMail(id);
                    boolean tempAllowed = true;
                    if (uRateServer.judgesList != null)
                    {
                        for (Judge judgesList : uRateServer.judgesList)
                        {
                            if(judgesList.getJudgeName().equals(email) == true)
                            {
                                tempAllowed = false;
                            }
                        }
                    }
                    if(tempAllowed)
                    {
                        uRateServer.judgesList.add(new Judge(email));
                    }
                } 
                catch (JSONException e) 
                {
                    e.printStackTrace();
                }

                //response to successful auto login
                response.setContentType("application/json;charset=UTF-8");
                response.getWriter().print(jsonResponse);
            }
            //Login fails
            else
            {
                JSONObject jsonResponse = new JSONObject();
                try 
                {
                    jsonResponse.put("status", "failed");
                } 
                catch (JSONException e) 
                {
                    e.printStackTrace();
                }

                //response to failed auto login
                response.setContentType("application/json;charset=UTF-8");
                response.getWriter().print(jsonResponse);
            }
        }
        database.close();
    }
}
