/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author Dieter
 */
public class sumReport extends reportGenerator 
{
    public sumReport(int [][] _Scores, String [] _ImgNames)
    {
        super(_Scores,_ImgNames);
    }
    
    @Override
    public report generateReport()
    {
        int [] temp = new int[this.scores.length];
        for(int i = 0; i < this.scores.length; i++)
        {
            int temp1 = 0;
            for(int j = 0; j < this.scores[i].length;j++)
            {
                temp1 = temp1 + this.scores[i][j];
            }
            temp[i] = temp1;
        }
        report temp3 = new report(temp,this.imgNames);
        return temp3;
    }
}
