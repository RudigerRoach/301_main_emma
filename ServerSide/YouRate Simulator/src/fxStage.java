
import java.awt.image.BufferedImage;
import javafx.stage.Stage;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author Endzeit
 */
public class fxStage extends Stage{

    Session mySession;
    BufferedImage[] images = null;
    
    public fxStage(Session ses) 
    {
        mySession = ses;
        System.out.println("Inside fxStage with "+ mySession.imageDetails[0]);
        images = mySession.images;
    }
    
    
    
}
