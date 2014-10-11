/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import java.awt.image.BufferedImage;
import java.io.IOException;
import java.net.URL;
import java.util.LinkedList;
import java.util.ResourceBundle;
import java.util.logging.Level;
import java.util.logging.Logger;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.fxml.Initializable;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.*;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;
import javafx.stage.Screen;
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
    private ImageView image;
    
    @FXML
    private TableView imagesRemaining;
    
    int current = 0;
    Configuration config;
    BufferedImage myImages[];
    uRateServer server;
    LinkedList imagePaths;
    Image currentImage;
    
    @Override
    public void initialize(URL url, ResourceBundle rb) 
    {
//        FXMLLoader loader = new FXMLLoader(getClass().getResource("Display.fxml"));
//        Scene newScene = null;
//        try {
//            newScene = new Scene(loader.load());
//        } catch (IOException ex) {
//            Logger.getLogger(FXMLrunningSessionController.class.getName()).log(Level.SEVERE, null, ex);
//        }
//        DisplayController controller = loader.getController();
//        Stage dialogStage = new Stage();
//        dialogStage.setScene(newScene);
//        dialogStage.setTitle("Display");
//        
//        dialogStage.setFullScreen(true);
//        
//        
//        
//        
    }
    
    public void setConfig(Configuration myConfig,LinkedList imgP) throws Exception
    {
        config = myConfig;
        System.out.println("Config called with min of "+ config.getBotRange());
        imagePaths = imgP;
        
        final uRateServer myServer =new uRateServer(config);
            try
            {
                myServer.startSession();
            }
            catch(Exception ex)
            {
                System.out.println(ex);
            }
            
        System.out.println("-------------------------------------" + imagePaths.get(current).toString());
            
            
        //Image newImage = new Image("image1.jpg");
//        image.setImage(newImage);
//        image.setFitWidth(100);
//        image.setPreserveRatio(true);
//        image.setSmooth(true);
//        image.setCache(true);
            
            
            
            
            
        FXMLLoader loader = new FXMLLoader(getClass().getResource("Display.fxml"));
        Scene newScene = new Scene(loader.load());
        DisplayController controller = loader.getController();
        Stage dialogStage = new Stage();
        dialogStage.setScene(newScene);
        dialogStage.setTitle("Display");
        dialogStage.setFullScreen(true);
        //controller.setDialogStage(dialogStage);
        dialogStage.show();
        
        
        
        //Code for duel screen
//            int primaryMon;
//            Screen primary = Screen.getPrimary();
//            for(int i = 0; i < Screen.getScreens().size(); i++){
//                if(Screen.getScreens().get(i).equals(primary)){
//                    primaryMon = i;
//                    System.out.println("primary: " + i);
//                    break;
//        
//        
//        
//    }
//}
//            After this we init and show the primary stage. It is important to do this on the primary monitor (for hiding taskbars and such things).
//
//            Screen screen2 = Screen.getScreens().get(primaryMon);
//            Stage stage2 = new Stage();
//            stage2.setScene(new Scene(new Label("primary")));
//            //we need to set the window position to the primary monitor:
//            stage2.setX(screen2.getVisualBounds().getMinX());
//            stage2.setY(screen2.getVisualBounds().getMinY());
//            stage2.setFullScreen(true);
//            stage2.show();
//            Now the workaround part. We create the stages for the other monitors:
//
//            Label label = new Label("monitor " + i);
//            stage.setScene(new Scene(label));
//            System.out.println(Screen.getScreens().size());
//            Screen screen = Screen.getScreens().get(i); //i is the monitor id
//
//            //set the position to one of the "slave"-monitors:
//            stage.setX(screen.getVisualBounds().getMinX());
//            stage.setY(screen.getVisualBounds().getMinY());
//
//            //set the dimesions to the screen size:
//            stage.setWidth(screen.getVisualBounds().getWidth());
//            stage.setHeight(screen.getVisualBounds().getHeight());
//
//            //show the stage without decorations (titlebar and window borders):
//            stage.initStyle(StageStyle.UNDECORATED);
//            stage.show();
        
        int primaryMon;
        Screen primary = Screen.getPrimary();
        for(int i = 0; i < Screen.getScreens().size(); i++){
            if(Screen.getScreens().get(i).equals(primary)){
                primaryMon = i;
                System.out.println("primary: " + i);
                break;
            }
        }

            
    }
    
    
    
    @FXML
    private void handleNext(ActionEvent event) throws IOException 
    {
        
        System.out.println("Next called");
        FXMLLoader loader = new FXMLLoader(getClass().getResource("Display.fxml"));
        Scene newScene = null;
        try {
            newScene = new Scene(loader.load());
        } catch (IOException ex) {
            Logger.getLogger(FXMLrunningSessionController.class.getName()).log(Level.SEVERE, null, ex);
        }
//        DisplayController controller = loader.getController();
//        Stage dialogStage = new Stage();
//        dialogStage.setScene(newScene);
//        dialogStage.setTitle("Display");   
//        dialogStage.setFullScreen(true);
        
    }
    
    
    @FXML
    private void handlePrevious(ActionEvent event) throws IOException 
    {
        
        System.out.println("Previous called");
        if(current != 0)
            current--;
        
        
//        DisplayController controller = loader.getController();
//        Stage dialogStage = new Stage();
//        dialogStage.setScene(newScene);
//        dialogStage.setTitle("Display");   
//        dialogStage.setFullScreen(true);
        
    }

    
//    public void setServer(uRateServer s)
//    {
//        server = s;
//    }
     
    protected void finalize ()  
    {
      try
      {
          server.close();
          
      }
      catch(Exception x){}
        
    }
    
}
