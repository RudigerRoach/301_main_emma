/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import java.net.URL;
import java.util.ResourceBundle;
import javafx.fxml.Initializable;

/**
 * FXML Controller class
 *
 * @author Endzeit
 */
public class DisplayController implements Initializable {
    private Configuration mySession;

    /**
     * Initializes the controller class.
     */
    @Override
    public void initialize(URL url, ResourceBundle rb) 
    {
    mySession = Configuration.getInstance();
    System.out.println("Inside display "+mySession.botRange);
    }
    
}
