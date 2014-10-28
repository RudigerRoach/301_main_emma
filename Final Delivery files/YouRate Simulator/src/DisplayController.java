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
import javafx.scene.layout.HBox;
import javax.imageio.ImageIO;

public class DisplayController implements Initializable {
    
    @FXML 
    public ImageView imageView;
    
    @FXML
    public HBox hbox;
    
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