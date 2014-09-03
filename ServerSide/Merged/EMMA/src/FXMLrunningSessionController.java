/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import java.net.URL;
import java.util.ResourceBundle;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.control.*;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;

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
    
    
    
    @Override
    public void initialize(URL url, ResourceBundle rb) {
        // TODO
    }    
    
}
