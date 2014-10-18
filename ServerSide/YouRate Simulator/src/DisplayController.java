/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.net.URL;
import java.util.ResourceBundle;
import java.util.logging.Level;
import java.util.logging.Logger;
import javafx.embed.swing.SwingFXUtils;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;
import javax.imageio.ImageIO;

/**
 * FXML Controller class
 *
 * @author Endzeit
 */
public class DisplayController implements Initializable {

    /**
     * Initializes the controller class.
     */
    

    @FXML 
    public ImageView imageView;
    
    @Override
    public void initialize(URL url, ResourceBundle rb) 
    {
        try {
            BufferedImage st = ImageIO.read(new File("image1.jpg"));
            Image curimage = SwingFXUtils.toFXImage(st, null);
            imageView.setImage(curimage);
            imageView.fitHeightProperty();
            imageView.fitWidthProperty();
        } catch (IOException ex) {
            Logger.getLogger(DisplayController.class.getName()).log(Level.SEVERE, null, ex);
        }
        
//        Image image = new Image("image1.jpg",true);
//        imageView = new ImageView();
//        imageView.setImage(image);
    }
    BufferedImage[] myImages;
    public void setImages(BufferedImage[] toLoad) 
    {
        System.out.println("Image :" + toLoad);
        Image curimage = SwingFXUtils.toFXImage(toLoad[0], null);
        imageView.setImage(curimage);
        imageView.fitHeightProperty();
        imageView.fitWidthProperty();
        System.out.println("called Set Image");
    
    }
    
}
