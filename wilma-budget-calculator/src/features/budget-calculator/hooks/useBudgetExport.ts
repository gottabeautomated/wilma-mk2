import { useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import type { BudgetBreakdown, BudgetFormData } from '../types/budget.types';

interface UseBudgetExportProps {
  formData: BudgetFormData;
  result: BudgetBreakdown;
}

export const useBudgetExport = ({ formData, result }: UseBudgetExportProps) => {
  const [isExporting, setIsExporting] = useState(false);

  // Export to PDF
  const exportToPdf = async () => {
    try {
      setIsExporting(true);

      // Wait for any required UI updates
      await new Promise(resolve => setTimeout(resolve, 100));

      // Get the element to export
      const element = document.getElementById('budget-results');
      if (!element) {
        throw new Error('Could not find results element to export');
      }

      // Create a clone of the element to modify for PDF export
      const clone = element.cloneNode(true) as HTMLElement;
      
      // Apply some CSS for better PDF rendering
      clone.style.padding = '20px';
      clone.style.backgroundColor = 'white';
      clone.style.width = '800px';

      // Temporarily add to document to capture
      clone.style.position = 'absolute';
      clone.style.left = '-9999px';
      document.body.appendChild(clone);
      
      // Create the PDF
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      
      // Add custom header
      pdf.setFillColor(59, 130, 246); // primary blue
      pdf.rect(0, 0, pageWidth, 25, 'F');
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(18);
      pdf.text('Wedding Budget Plan', pageWidth / 2, 15, { align: 'center' });
      
      // Add bride and groom names if provided
      const names = formData.partnerNames.filter(name => name).join(' & ');
      if (names) {
        pdf.setFontSize(12);
        pdf.text(`For ${names}`, pageWidth / 2, 22, { align: 'center' });
      }
      
      // Add wedding details
      pdf.setTextColor(0, 0, 0);
      pdf.setFontSize(11);
      const weddingDate = formData.weddingDate.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
      
      pdf.text([
        `Wedding Date: ${weddingDate}`,
        `Location: ${formData.location}`,
        `Style: ${formData.style.charAt(0).toUpperCase() + formData.style.slice(1)}`,
        `Guest Count: ${formData.guestCount}`,
        `Total Budget: $${result.totalBudget.toLocaleString()}`
      ], 15, 40);
      
      // Create canvas from clone
      const canvas = await html2canvas(clone, {
        scale: 2,
        useCORS: true,
        logging: false
      });
      
      // Add disclaimer that canvas was generated by Wilma Mk2
      pdf.setFontSize(8);
      pdf.setTextColor(150, 150, 150);
      pdf.text('Generated by Wilma Mk2 Budget Calculator', pageWidth / 2, pageHeight - 10, { align: 'center' });
      
      // Convert canvas to image
      const imgData = canvas.toDataURL('image/png');
      
      // Add image to PDF, starting after our custom header
      const imgHeight = canvas.height * pageWidth / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 50, pageWidth, imgHeight * 0.55);
      
      // Add budget breakdown table
      pdf.addPage();
      pdf.setFillColor(59, 130, 246);
      pdf.rect(0, 0, pageWidth, 15, 'F');
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(14);
      pdf.text('Budget Breakdown Details', pageWidth / 2, 10, { align: 'center' });
      
      // Table header
      pdf.setFillColor(240, 240, 240);
      pdf.rect(15, 25, pageWidth - 30, 10, 'F');
      pdf.setTextColor(0, 0, 0);
      pdf.setFontSize(10);
      pdf.text('Category', 20, 32);
      pdf.text('Amount', pageWidth - 70, 32);
      pdf.text('Percentage', pageWidth - 40, 32);
      
      // Table data
      let yPos = 40;
      result.categories.forEach((category, index) => {
        const isEven = index % 2 === 0;
        if (isEven) {
          pdf.setFillColor(250, 250, 250);
          pdf.rect(15, yPos - 5, pageWidth - 30, 10, 'F');
        }
        
        pdf.text(category.name, 20, yPos);
        pdf.text(`$${category.amount.toLocaleString()}`, pageWidth - 70, yPos);
        pdf.text(`${Math.round(category.percentage * 100)}%`, pageWidth - 40, yPos);
        
        yPos += 10;
      });
      
      // Add recommendations page
      pdf.addPage();
      pdf.setFillColor(59, 130, 246);
      pdf.rect(0, 0, pageWidth, 15, 'F');
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(14);
      pdf.text('AI Budget Recommendations', pageWidth / 2, 10, { align: 'center' });
      
      // Add recommendations
      pdf.setTextColor(0, 0, 0);
      pdf.setFontSize(12);
      pdf.text('Top Recommendations:', 15, 25);
      
      yPos = 35;
      result.recommendations.slice(0, 5).forEach((rec, index) => {
        pdf.setFontSize(10);
        pdf.setTextColor(0, 0, 0);
        pdf.text(`${index + 1}. ${rec.title}`, 15, yPos);
        
        // Wrap description text
        const splitDesc = pdf.splitTextToSize(rec.description || '', pageWidth - 40);
        pdf.setFontSize(9);
        pdf.setTextColor(80, 80, 80);
        pdf.text(splitDesc, 20, yPos + 5);
        
        yPos += 10 + (splitDesc.length * 5);
      });
      
      // Add savings suggestions
      yPos += 10;
      pdf.setFontSize(12);
      pdf.setTextColor(0, 0, 0);
      pdf.text('Potential Savings:', 15, yPos);
      
      yPos += 10;
      (result.savingsSuggestions || []).slice(0, 5).forEach((suggestion, index) => {
        pdf.setFontSize(10);
        pdf.setTextColor(0, 0, 0);
        pdf.text(`${index + 1}. ${suggestion.title} - $${suggestion.potentialSavings.toLocaleString()}`, 15, yPos);
        
        // Wrap description text
        const splitDesc = pdf.splitTextToSize(suggestion.description, pageWidth - 40);
        pdf.setFontSize(9);
        pdf.setTextColor(80, 80, 80);
        pdf.text(splitDesc, 20, yPos + 5);
        
        yPos += 10 + (splitDesc.length * 5);
      });
      
      // Save the PDF
      pdf.save(`wedding-budget-plan-${new Date().toISOString().split('T')[0]}.pdf`);
      
      // Clean up
      document.body.removeChild(clone);
      setIsExporting(false);
      
      return true;
    } catch (error) {
      console.error('Error exporting PDF:', error);
      setIsExporting(false);
      return false;
    }
  };

  return {
    exportToPdf,
    isExporting
  };
};
