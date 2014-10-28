/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author Dieter
 */
public class report 
{
    String [] imgNames = null;
    int [] scores = null;
    
    public report(int [] _scores, String [] _imgNames)
    {
        scores = _scores;
        imgNames = _imgNames;
    }
    
    public int [] getScores()
    {
        return scores;
    }
    
    public String [] getNames()
    {
        return imgNames;
    }
}
