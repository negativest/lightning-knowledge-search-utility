public with sharing class KnowledgeSearchCtrl {
	
    @AuraEnabled 
    public static List<FAQ_Advertisement__kav> searchArticles(String searchKeyword) {
        Search.SearchResults searchResults = Search.find('FIND \'' + searchKeyword + '\' IN ALL FIELDS RETURNING FAQ_Advertisement__kav(Id, Title, Answer__c WHERE PublishStatus = \'Online\' AND Language = \'ja\') WITH SNIPPET (target_length=120)');
        List<Search.SearchResult> articlelist = searchResults.get('FAQ_Advertisement__kav');
        List<FAQ_Advertisement__kav> retVal = new List<FAQ_Advertisement__kav>();
        for (Search.SearchResult searchResult : articleList) {
            retVal.add((FAQ_Advertisement__kav)searchResult.getSObject());
        }
        return retVal;
    }
}