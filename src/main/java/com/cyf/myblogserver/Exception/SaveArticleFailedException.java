package com.cyf.myblogserver.Exception;

public class SaveArticleFailedException extends Exception{
    public SaveArticleFailedException() {
        super("Failed to save the article");
    }
}
