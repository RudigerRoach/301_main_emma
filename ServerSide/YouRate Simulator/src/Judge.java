/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author Dieter
 */
public class Judge 
{
    private int [] score;
    private String [] comment;
    private int currentImage;
    private final String judgeName;
    
    public Judge(String _name)
    {
        score = new int [uRateServer.totaalImages];
        for (int i= 0; i < uRateServer.totaalImages;i++)
        {
            score[i] = 0;
        }
        comment = new String [uRateServer.totaalImages];
        for (int i = 0; i < uRateServer.totaalImages;i++)
        {
            comment[i] = "";
        }
        judgeName = _name;
        currentImage = 1;
    }
    
    public void setScoreAndComent(int _score, String _comment)
    {
        score[currentImage-1] = _score;
        comment[currentImage-1] = _comment;
        currentImage++;
    }
    
    public int getCurrentImage()
    {
        return currentImage;
    }
    
    public String getComment()
    {
        return comment[currentImage-1];
    }
    
    public int [] getCurrentScores()
    {
        return score;
    }
    
    public String getJudgeName()
    {
        return judgeName;
    }
    
    public void setImageSpecificScoreAndComment(int _index, int _score, String _comment)
    {
        score[_index] = _score;
        comment[_index] = _comment;
    }
}
