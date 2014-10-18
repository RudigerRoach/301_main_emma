/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import java.awt.Rectangle;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.net.URL;
import java.util.LinkedList;
import java.util.ResourceBundle;
import java.util.logging.Level;
import java.util.logging.Logger;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.collections.transformation.FilteredList;
import javafx.collections.transformation.SortedList;
import javafx.embed.swing.SwingFXUtils;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.fxml.Initializable;
import javafx.scene.Node;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.*;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;
import javafx.scene.image.ImageViewBuilder;
import javafx.scene.layout.AnchorPane;
import javafx.stage.Screen;
import javafx.stage.Stage;
import javafx.stage.StageStyle;

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
    private ImageView imageView;
    
    @FXML
    public Label descriptLabel;
    
    public LinkedList imagePaths;
    public LinkedList imageDescription;
    
    
    @FXML
    private TableView<Images> imagesRemaining;
    @FXML
    private TableColumn<Images, String> imagePath;
    @FXML
    private TableColumn<Images, String> descript;
    
    private ObservableList<Images> imageData = FXCollections.observableArrayList();
    @FXML
    protected AnchorPane AnchorPane;
    int sec;
    int current = 0;
    int max;
    Configuration config;
    BufferedImage myImages[];
    uRateServer server;
    DisplayController controller;
    Stage bigScreen;

    Image currentImage;
    
    @Override
    public void initialize(URL url, ResourceBundle rb) 
    {

    }
    
    public void setConfig(Configuration myConfig) throws Exception
    {
        config = myConfig;
        System.out.println("Config called with min of "+ config.getBotRange());
        max = config.images.length-1;
        
        Image curimage = SwingFXUtils.toFXImage(config.images[0], null);
        imageView.setImage(curimage);
        imageView.fitHeightProperty();
        imageView.fitWidthProperty();
        

        
        
        
        descriptLabel.setText(config.imageDetails[0].toString());

        server =new uRateServer(config);
            try
            {
                server.startSession();
            }
            catch(Exception ex)
            {
                System.out.println(ex);
            }

        
        //Code for duel screen
            int primaryMon;
            Screen primary = Screen.getPrimary();
            sec =0;
            for(int i = 0; i < Screen.getScreens().size(); i++)
            {
                if(!Screen.getScreens().get(i).equals(primary))
                {
                    sec = i;
                    System.out.println("sec: " + i);
                    break;  
                 }
                else sec = i;
             }
            
            if(config.controlledSession)
            {
                Previous.setDisable(true);
                FXMLLoader loader = new FXMLLoader(getClass().getResource("Display.fxml"));
                Scene newScene = new Scene(loader.load());
                controller = loader.getController();
                bigScreen = new Stage();
                bigScreen.setScene(newScene);
                bigScreen.setTitle("Display");
                //dialogStage.setFullScreen(true);
                controller.setImages(config.images);
                controller.imageView.setImage(curimage);
                controller.imageView.fitHeightProperty();
                controller.imageView.fitWidthProperty();
                Screen screen = Screen.getScreens().get(sec);
                bigScreen.setX(screen.getVisualBounds().getMinX());
                bigScreen.setY(screen.getVisualBounds().getMinY());
                bigScreen.setWidth(screen.getVisualBounds().getWidth());
                bigScreen.setHeight(screen.getVisualBounds().getHeight());
                controller.imageView.setFitHeight(screen.getVisualBounds().getHeight());
                controller.imageView.setFitWidth(screen.getVisualBounds().getWidth());
                curimage = SwingFXUtils.toFXImage(config.images[0], null);
                controller.imageView.setImage(curimage);
                controller.imageView.fitHeightProperty();
                controller.imageView.fitWidthProperty();
                bigScreen.initStyle(StageStyle.UNDECORATED);
                bigScreen.show();
            }    
    }
    
    
    
    
    public void addImages(LinkedList p,LinkedList d)
    {
        imagePaths = p;
        imageDescription = d;
    }
    
    @FXML
    private void handleNext(ActionEvent event) throws IOException 
    {
        if(current < max)
        {
            current++;
            Image curimage = SwingFXUtils.toFXImage(config.images[current],null);
            imageView.setImage(curimage);
            imageView.fitHeightProperty();
            imageView.fitWidthProperty();

            if(config.controlledSession)
            {
                controller.imageView.setImage(curimage);
                controller.imageView.fitHeightProperty();
                controller.imageView.fitWidthProperty();            
                imagePaths.remove(0);
                imageDescription.remove(0);
                loadImages();
            }
            
            descriptLabel.setText(config.imageDetails[current].toString());
            
        }

    }
    
    
    @FXML
    private void handlePrevious(ActionEvent event) throws IOException 
    {
        
        if(current > 0)
        {
            current--;
            Image curimage = SwingFXUtils.toFXImage(config.images[current],null);
            imageView.setImage(curimage);
            imageView.fitHeightProperty();
            imageView.fitWidthProperty();
            descriptLabel.setText(config.imageDetails[current].toString());
            if(config.controlledSession)
            {
                controller.imageView.setImage(curimage);
                controller.imageView.fitHeightProperty();
                controller.imageView.fitWidthProperty();
                System.out.println("Controller has image = " + controller.imageView.getImage());
            }
            
        }
    }
    
    @FXML
    protected void finalize (ActionEvent event) throws IOException  
    {
      try
      {
          server.close();
          
            FXMLLoader loader = new FXMLLoader(getClass().getResource("FXMLDocument.fxml"));
            Scene newScene = new Scene(loader.load());
            Stage restarter = new Stage();
            restarter.setScene(newScene);
            restarter.setTitle("uRate");
            restarter.show();
          
          Node  source = (Node) event.getSource(); 
            Stage stage  = (Stage) source.getScene().getWindow();
            stage.close();
            System.out.println("finilize called");
            bigScreen.close();
            
            FXMLLoader loader2 = new FXMLLoader(getClass().getResource("Results.fxml"));
            Scene res = new Scene(loader2.load());
            ResultsController controller = loader2.getController();
            Stage dialogStage = new Stage();
            dialogStage.setScene(res);
            dialogStage.setTitle("Results");
            
            String[] names = new String[imagePaths.size()];
            for(int i =0; i < imagePaths.size();i++)
            {
                int last = imagePaths.get(i).toString().lastIndexOf('\\');
                names[i] = imagePaths.get(i).toString().substring(last+1);
            }
            
            if(config.type == "normal")
            {
                controller.setName("Final Scores");
                controller.setType("average", server.getScores(), names);
                controller.populate();
            }
            else
            {
                controller.setName("Final Scores");
                controller.setType("sum", server.getScores(), names);
                controller.populate();
            }
            
            //controller.setDialogStage(dialogStage);
                Screen screen = Screen.getScreens().get(sec);
                dialogStage.setX(screen.getVisualBounds().getMinX());
                dialogStage.setY(screen.getVisualBounds().getMinY());
                dialogStage.setWidth(screen.getVisualBounds().getWidth());
                dialogStage.setHeight(screen.getVisualBounds().getHeight());
                //dialogStage.initStyle(StageStyle.UNDECORATED);
                dialogStage.show();
            
            
            
      }
      catch(Exception x){}
        
    }
        public void loadImages()
    {
        System.out.println("Running loadImages in Running session");
        imageData.clear();
        for(int i =0; i< imagePaths.size();i++)
        {
            imageData.add(new Images(imagePaths.get(i).toString(),imageDescription.get(i).toString()));
        }
        
        imagePath.setCellValueFactory(cellData -> cellData.getValue().imageProperty());
        descript.setCellValueFactory(cellData -> cellData.getValue().descriptionProperty());
        
		FilteredList<Images> filteredData = new FilteredList<>(imageData, p -> true);
		SortedList<Images> sortedData = new SortedList<>(filteredData);
		sortedData.comparatorProperty().bind(imagesRemaining.comparatorProperty());
		imagesRemaining.setItems(sortedData);
    }
}
