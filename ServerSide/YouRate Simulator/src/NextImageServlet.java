
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
        if(YourateServer.session.getType().equals("winner") == true)
        {
            String previousImageScore = request.getParameter("result");
            String previousImageComment = request.getParameter("comment");
            String judge = request.getParameter("deviceUID");
            String choosen = request.getParameter("choosen");
            DBAccess database = new DBAccess();
            database.open();
            String email = database.getMail(judge);
            for (Judge judgesList : YourateServer.judgesList) 
            {
                if (judgesList.getJudgeName().equals(email) == true)
                {
                    judgesList.setImageSpecificScoreAndComment(Integer.parseInt(choosen), Integer.parseInt(previousImageScore), previousImageComment);
                }
            }
            JSONObject jsonResponse = new JSONObject();
            try 
            {
                jsonResponse.put("status", "2");
            }
            catch (JSONException e) 
            {
                e.printStackTrace();
            }
            
            database.close();
            response.setContentType("application/json;charset=UTF-8");
            response.getWriter().print(jsonResponse);
        }
        if(YourateServer.session.getControll() == false)
        {
            System.out.println("Next image is called");
            String previousImageScore = request.getParameter("result");
            String previousImageComment = request.getParameter("comment");
            String judge = request.getParameter("deviceUID");
            DBAccess database = new DBAccess();
            database.open();
            String email = database.getMail(judge);
            for (Judge judgesList : YourateServer.judgesList) 
            {
                if (judgesList.getJudgeName().equals(email) == true)
                {
                    judgesList.setScoreAndComent(Integer.parseInt(previousImageScore), previousImageComment);
                    if (judgesList.getCurrentImage()-1 < YourateServer.totaalImages)
                    {
                        JSONObject jsonResponse = new JSONObject();
                        try 
                        {
                            jsonResponse.put("status", "1");
                            jsonResponse.put("sessionType", YourateServer.session.getType());
                            jsonResponse.put("description", YourateServer.session.getImageDetails(judgesList.getCurrentImage()-1));
                            jsonResponse.put("imgPath","temp/" + YourateServer.tmpCompressedImage[judgesList.getCurrentImage()-1].getName());
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
            database.close();
        }
        else
        {
            String previousImageScore = request.getParameter("result");
            String previousImageComment = request.getParameter("comment");
            String judge = request.getParameter("deviceUID");
            DBAccess database = new DBAccess();
            database.open();
            String email = database.getMail(judge);
            for (Judge judgesList : YourateServer.judgesList) 
            {
                if (judgesList.getJudgeName().equals(email) == true)
                {
                    judgesList.setScoreAndComent(Integer.parseInt(previousImageScore), previousImageComment);
                    if (YourateServer.currentPhoto.get() < YourateServer.totaalImages)
                    {
                        while(judgesList.getCurrentImage() == YourateServer.currentPhoto.get())
                        {
                        }
                        JSONObject jsonResponse = new JSONObject();
                        try 
                        {
                            jsonResponse.put("status", "1");
                            jsonResponse.put("sessionType", YourateServer.session.getType());
                            jsonResponse.put("description", YourateServer.session.getImageDetails(YourateServer.currentPhoto.get() -1));
                            jsonResponse.put("imgPath","temp/" + YourateServer.tmpCompressedImage[YourateServer.currentPhoto.get()-1].getName());

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
            database.close();
        }
    }
}
