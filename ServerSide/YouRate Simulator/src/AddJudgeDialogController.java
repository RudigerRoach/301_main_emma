import java.io.IOException;
import java.net.URL;
import java.util.ResourceBundle;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.Node;
import javafx.scene.control.TextField;
import javafx.stage.Stage;

public class AddJudgeDialogController implements Initializable {
    private Stage dialogStage;

    @Override
    public void initialize(URL url, ResourceBundle rb) 
    {
        
    }    
    @FXML
    public TextField email;
    public boolean valid = false;
    
    @FXML
    private void add(ActionEvent event) throws IOException 
    {
        
        if(email.getText().length() > 4)
        {
            valid = true;
        }
        Node  source = (Node)  event.getSource(); 
        Stage stage  = (Stage) source.getScene().getWindow();
        stage.close();
    }  
}
