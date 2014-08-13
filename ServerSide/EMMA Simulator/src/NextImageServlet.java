
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

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
    public void doPost(HttpServletRequest request, HttpServletResponse response)
    {
        if(MinimalServer.session.getControll() == false)
        {
            String previousImageName = request.getParameter("imgPath");
            String previousImageScore = request.getParameter("result");
            String previousImageComment = request.getParameter("comment");
            int imageNumber = Integer.parseInt(previousImageName.substring(6, previousImageName.indexOf(".")));
            
        }
        else
        {
            
        }
    }
}
