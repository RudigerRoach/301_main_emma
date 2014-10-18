/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import java.awt.image.BufferedImage;
import java.net.URL;
import java.util.ResourceBundle;
import javafx.embed.swing.SwingFXUtils;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;

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
    public void initialize(URL url, ResourceBundle rb) {
        // TODO
//        Image image = new Image("image1.jpg");
//        
//        picture = new ImageView();
//        picture.setImage(image);
//         picture.setFitWidth(100);
//         picture.setPreserveRatio(true);
//         picture.setSmooth(true);
//         picture.setCache(true);
        Image image = new Image("sample.png",true);
        imageView = new ImageView();
        imageView.setImage(image);

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
