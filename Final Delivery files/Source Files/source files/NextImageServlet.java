
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
        if (request.getSession(false) != null)
        {
            if(uRateServer.session.getType().equals("winner") == true)
            {
                String previousImageComment = request.getParameter("comment");
                String judge = request.getParameter("deviceUID");
                String choosen = request.getParameter("result");
                String email = uRateServer.database.getMail(judge);
                
                
                for (Judge judgesList : uRateServer.judgesList) 
                {
                    if (judgesList.getJudgeName().equals(email) == true)
                    {
                        judgesList.setImageSpecificScoreAndComment(Integer.parseInt(choosen), 1, previousImageComment);
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

                response.setContentType("application/json;charset=UTF-8");
                response.getWriter().print(jsonResponse);
            }
            else if(uRateServer.session.getControll() == false)
            {
                String previousImageScore = request.getParameter("result");
                String previousImageComment = request.getParameter("comment");
                String judge = request.getParameter("deviceUID");

                String email = uRateServer.database.getMail(judge);
                for (Judge judgesList : uRateServer.judgesList) 
                {
                    System.out.println(email);
                    if (judgesList.getJudgeName().equals(email) == true)
                    {
                        judgesList.setScoreAndComent(Integer.parseInt(previousImageScore), previousImageComment);
                        if (judgesList.getCurrentImage()-1 < uRateServer.totaalImages)
                        {
                            JSONObject jsonResponse = new JSONObject();
                            try 
                            {
                                jsonResponse.put("status", "1");
                                jsonResponse.put("sessionType", uRateServer.session.getType());
                                jsonResponse.put("description", uRateServer.session.getImageDetails(judgesList.getCurrentImage()-1));
                                String path = uRateServer.tmpCompressedImage[judgesList.getCurrentImage()-1].getAbsolutePath().replace("\\", "/");
                                String path2 = path.substring(path.indexOf("/temp")+1, path.length());
                                jsonResponse.put("imgPath",path2);
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

                String email = uRateServer.database.getMail(judge);
                for (Judge judgesList : uRateServer.judgesList) 
                {
                    if (judgesList.getJudgeName().equals(email) == true)
                    {
                        judgesList.setScoreAndComent(Integer.parseInt(previousImageScore), previousImageComment);
                        if (uRateServer.currentPhoto.get() < uRateServer.totaalImages)
                        {
                            while(judgesList.getCurrentImage() == uRateServer.currentPhoto.get())
                            {
                            }
                            JSONObject jsonResponse = new JSONObject();
                            try 
                            {
                                jsonResponse.put("status", "1");
                                jsonResponse.put("sessionType", uRateServer.session.getType());
                                jsonResponse.put("description", uRateServer.session.getImageDetails(uRateServer.currentPhoto.get() -1));
                                String path = uRateServer.tmpCompressedImage[uRateServer.currentPhoto.get()-1].getAbsolutePath().replace("\\", "/");
                                String path2 = path.substring(path.indexOf("/temp")+1, path.length());
                                jsonResponse.put("imgPath",path2);
                                
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
                    }
                }
            }
        }
    }
}
