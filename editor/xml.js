
var WEdit = {};

WEdit.asXML = function(container)
{
  var xml = document.implementation.createDocument("http://example.com/wedit", "world");
  var root = xml.documentElement;
  
  WEdit.fillXML(container, xml, root);
  
  return xml;
};

WEdit.fillXML = function(container, xml, xmlElm)
{
  $(container).children().each(function()
  {
      var nElm = xmlElm;
      
      if (this.dataset.group)
      {
        nElm = xml.createElement(this.dataset.group);
        xmlElm.appendChild(nElm);
      }
      
      WEdit.fillXML(this, xml, nElm);
  });

  if (container.dataset.name)
  {
      var nElm = xml.createElement(container.dataset.name);
      nElm.textContent = container.value;
      xmlElm.appendChild(nElm);
  }

  if (container.dataset.attr)
  {
      xmlElm.setAttribute(container.dataset.attr, container.value);
  }
};


WEdit.fromXMLText = function(container, xmlText)
{
  var xprs = new DOMParser();
  var xml = xprs.parseFromString(xmlText, 'text/xml');
  WEdit.fromXML(container, xml);
  
  return xml;
}

WEdit.fromXML = function(container, xml)
{
  var root = xml.documentElement;
  
  WEdit.fillFromXML(container, xml, root);
}

WEdit.fillFromXML = function(container, rootElm)
{
  WEdit.fillFromXMLGroup(container, rootElm, 'general');
}

WEdit.fillFromXMLGroup = function(container, xmlContainer, groupName)
{
  var group = $(container).find('[data-group="' + groupName + '"]');
  
  $(xmlContainer).find(groupName).each(function()
  {
    $(this).children().each(function()
    {
      var tagName = this.tagName;
      var xmlElm = this;
      
      group.find("[data-name]").each(function()
      {
        if (this.dataset.name && this.dataset.name == tagName)
        {
          $(this).val(xmlElm.textContent);
        }
      });
    });
  });
  
}
