import java.net.URL;
import java.text.DateFormatSymbols;
import java.util.Arrays;
import java.util.Locale;
import java.util.ResourceBundle;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.chart.BarChart;
import javafx.scene.chart.CategoryAxis;
import javafx.scene.chart.NumberAxis;
import javafx.scene.chart.XYChart;

public class ResultsController implements Initializable {

    @FXML
    public BarChart<String, Integer> barChart;

    @FXML
    private CategoryAxis xAxis;
    @FXML
    private NumberAxis yAxis;
    private static reportGenerator generator;
    
    public ResultsController() 
    {
        
    }
    private XYChart.Series series1 = new XYChart.Series();;
    
    @Override
    public void initialize(URL url, ResourceBundle rb) 
    {
        String[] months = DateFormatSymbols.getInstance(Locale.ENGLISH).getMonths();
        xAxis.setLabel("Month");
        yAxis.setLabel("Value");
    
    }
    
    public void setName(String in)
    {
        series1.setName(in);
    }

    public void setType(String type,int[][] s,String[] names)
    {
        if(type == "sum")
            generator = new sumReport(s, names);
        else
            generator = new averageReport(s, names);
    }
    
    public void populate()
    {
        
        int [][] scores = new int[3][3];
        String [] names = new String[3];
        for (int i = 0 ; i < 3;i++)
        {
            names[i] = i + "asdf";
            for(int j = 0; j < 3;j++)
            {
                scores[i][j] = 2;
            }
        }
        generator = new sumReport(scores, names);
        report temp = generator.generateReport(); 
        series1.getData().add(new XYChart.Data("Hollywood", 12));
        series1.getData().add(new XYChart.Data("Birds", 15));
        series1.getData().add(new XYChart.Data("Cars", 22));
        series1.getData().add(new XYChart.Data("The Sky", 7));
        series1.getData().add(new XYChart.Data("Dogs", 15));
        series1.getData().add(new XYChart.Data("Boat", 10));
        barChart.getData().add(series1);
    }

}
