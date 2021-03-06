
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import javax.imageio.ImageIO;
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
public class getImage extends HttpServlet 
{   
    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException
    {
        String imagePath = request.getRequestURI();
        imagePath = imagePath.substring(6, imagePath.length());
        int j = 0;
        for(int i = 0; i < uRateServer.totaalImages;i++)
        {
            if(imagePath.equals(uRateServer.tmpCompressedImage[i].getName()) == true)
            {
                j = i;
                break;
            }
        }
        File f = new File(uRateServer.tmpCompressedImage[j].getAbsolutePath());
	BufferedImage bi = ImageIO.read(f);

        response.setContentType("image/jpg");
        ImageIO.write(bi, "jpg", response.getOutputStream());
    }
}
