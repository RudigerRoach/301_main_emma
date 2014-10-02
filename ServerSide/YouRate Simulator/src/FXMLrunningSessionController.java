/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import java.io.IOException;
import java.net.URL;
import java.util.ResourceBundle;
import java.util.logging.Level;
import java.util.logging.Logger;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.fxml.Initializable;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.*;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;
import javafx.stage.Stage;

public class FXMLrunningSessionController implements Initializable {

    /**
     * Initializes the controller class.
     */
    
    @FXML
    private Button Next;
    @FXML
    private Button Previous;
    @FXML
    private Button Finalize;
    
    @FXML
    private ImageView Image;
    
    @FXML
    private TableView imagesRemaining;
    
    Configuration mySession;
    
    @Override
    public void initialize(URL url, ResourceBundle rb) 
    {
    mySession = Configuration.getInstance();
    System.out.println(mySession.botRange);
    
    }
     
    
}
