
import java.io.IOException;
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
public class NextImageServlet extends HttpServlet
{
    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException
    {
        if(MinimalServer.session.getControll() == false)
        {
            System.out.println("Next image is called");
            String previousImageScore = request.getParameter("result");
            String previousImageComment = request.getParameter("comment");
            String judge = request.getParameter("deviceUID");
            DBAccess database = new DBAccess();
            database.open();
            String email = database.getMail(judge);
            for (Judge judgesList : MinimalServer.judgesList) 
            {
                if (judgesList.getJudgeName().equals(email) == true)
                {
                    judgesList.setScoreAndComent(Integer.parseInt(previousImageScore), previousImageComment);
                    if (judgesList.getCurrentImage()-1 < MinimalServer.totaalImages)
                    {
                        JSONObject jsonResponse = new JSONObject();
                        try 
                        {
                            jsonResponse.put("status", "1");
                            jsonResponse.put("sessionType", "normal");
                            jsonResponse.put("description", MinimalServer.session.getImageDetails(judgesList.getCurrentImage()-1));
                            jsonResponse.put("imgPath","temp/" + MinimalServer.tmpCompressedImage[judgesList.getCurrentImage()-1].getName());
                            System.out.println();
                        } 
                        catch (JSONException e) 
                        {
                            e.printStackTrace();
                        }

                        //response to successful auto login
                        response.setContentType("application/json;charset=UTF-8");
                        response.getWriter().print(jsonResponse);
                    }
                    else
                    {
                        JSONObject jsonResponse = new JSONObject();
                        try 
                        {
                            jsonResponse.put("status", "2");

                        } 
                        catch (JSONException e) 
                        {
                            e.printStackTrace();
                        }

                        //response to successful auto login
                        response.setContentType("application/json;charset=UTF-8");
                        response.getWriter().print(jsonResponse);
                    }
                    break;
                }
            }
        }
        else
        {
            String previousImageScore = request.getParameter("result");
            String previousImageComment = request.getParameter("comment");
            String judge = request.getParameter("deviceUID");
            DBAccess database = new DBAccess();
            database.open();
            String email = database.getMail(judge);
            for (Judge judgesList : MinimalServer.judgesList) 
            {
                if (judgesList.getJudgeName().equals(email) == true)
                {
                    judgesList.setScoreAndComent(Integer.parseInt(previousImageScore), previousImageComment);
                    if (MinimalServer.currentPhoto.get() < MinimalServer.totaalImages)
                    {
                        while(judgesList.getCurrentImage() == MinimalServer.currentPhoto.get())
                        {
                        }
                        JSONObject jsonResponse = new JSONObject();
                        try 
                        {
                            jsonResponse.put("status", "1");
                            jsonResponse.put("sessionType", MinimalServer.session.getSessionType());
                            jsonResponse.put("description", MinimalServer.session.getImageDetails(MinimalServer.currentPhoto.get() -1));
                            jsonResponse.put("imgPath","temp/" + MinimalServer.tmpCompressedImage[MinimalServer.currentPhoto.get()-1].getName());

                        } 
                        catch (JSONException e) 
                        {
                            e.printStackTrace();
                        }

                        //response to successful auto login
                        response.setContentType("application/json;charset=UTF-8");
                        response.getWriter().print(jsonResponse);
                    }
                    else
                    {
                        JSONObject jsonResponse = new JSONObject();
                        try 
                        {
                            jsonResponse.put("status", "2");

                        } 
                        catch (JSONException e) 
                        {
                            e.printStackTrace();
                        }

                        //response to successful auto login
                        response.setContentType("application/json;charset=UTF-8");
                        response.getWriter().print(jsonResponse);
                    }
                    break;
                }
            }
        }
    }
}
