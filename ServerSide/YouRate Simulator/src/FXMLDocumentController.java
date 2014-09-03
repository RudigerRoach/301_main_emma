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
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.fxml.Initializable;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.*;
import javafx.scene.control.Button;
import javafx.stage.Stage;
import javax.imageio.ImageIO;


/**
 *
 * @author Endzeit
 */
public class FXMLDocumentController implements Initializable{
     /**
     * Initializes the controller class.
     */
    
    @FXML
    private Button start;
    
    @FXML
    private CheckBox controlledSession;
   
    @FXML
    private CheckBox openSession;
    
    @FXML
    private CheckBox commentsEnabled;
    
    @FXML
    private RadioButton Normal;
    
    @FXML
    private RadioButton Elimination;
    
    @FXML
    private RadioButton Winner;
    
    @FXML
    private TextField minimumScore;
    
    @FXML
    private TextField maximumScore;
    
    @FXML
    private TableView judges;
    
    @FXML
    private TableView images;
    
    
    public FXMLDocumentController()
    {
        
    }
    
    @FXML
    private void handleStartButtonAction(ActionEvent event) throws IOException {
        System.out.println("You called me!");
        Parent root = FXMLLoader.load(getClass().getResource("FXMLrunningSession.fxml"));
        Scene newScene = new Scene(FXMLLoader.load(getClass().getResource("FXMLrunningSession.fxml")));
        Stage newStage = new Stage();
        newStage.setScene(newScene);
        newStage.setTitle("Emma Simulator");
        newStage.show();

        
        linkedList names = new linkedList();
        linkedList name1 = new linkedList();
        linkedList name2 = new linkedList();
        linkedList name3 = new linkedList();
        linkedList name4 = new linkedList();
        linkedList name5 = new linkedList();
        
        name1.info = "image1";
        name2.info = "image2";
        name3.info = "image3";
        name4.info = "image4";
        name5.info = "image5";
        
        names.next = name1;
        name1.next = name2;
        name2.next = name3;
        name3.next = name4;
        name4.next = name5;
        
        BufferedImage[] images = new BufferedImage[5];
        images[0] = ImageIO.read(new File("image1.jpg"));
        images[1] = ImageIO.read(new File("image2.jpg"));        
        images[2] = ImageIO.read(new File("image3.jpg"));
        images[3] = ImageIO.read(new File("image4.jpg"));   
        images[4] = ImageIO.read(new File("image5.jpg"));
        System.out.println(images[0]);
        
        String[] judges = new String[5];
        judges[0]= "Johan";
        judges[1]= "test";
        judges[2]= "test123@test.com";
        judges[3]= "Test3";
        judges[4]= "Test4";
        
        String[] imgDetails = new String[5]; 
        
        imgDetails[0] = "Beauty comes in all shapes and sizes";
        imgDetails[1] = "Where I want to be";
        imgDetails[2] = "Natures perfect architecture";
        imgDetails[3] = "Huisie by die see";
        imgDetails[4] = "Not a cat you want to play with";
        
        Session mySession = new Session(names,images,judges,10,0,true,false,imgDetails,"normal");
        
        try
        {
            MinimalServer myServer = new MinimalServer(mySession);
            myServer.startSession();
        }
        catch(Exception ex)
        {
            System.out.println(ex);
        }
//        Scene display = new Scene(FXMLLoader.load(getClass().getResource("Display.fxml")));
//        Stage displayStage = new Stage();
//        displayStage.setScene(display);
//        displayStage.setTitle("Emma Simulator");
//        displayStage.show();
        
        
        
    }
    
    @Override
    public void initialize(URL url, ResourceBundle rb) {
        // TODO
    }
}
