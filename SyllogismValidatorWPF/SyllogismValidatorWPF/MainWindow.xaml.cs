using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace SyllogismValidatorWPF
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public List<Syllogism> ValidSyllogisms { get; set; }
        public List<Syllogism> InvalidSyllogisms { get; set; }
        public List<Syllogism> Syllogisms { get; set; }
        public bool isFirstTime { get; set; }
        public MainWindow()
        {
            InitializeComponent();
            ValidSyllogisms = new List<Syllogism>();
            InvalidSyllogisms = new List<Syllogism>();
            Syllogisms = new List<Syllogism>();
            isFirstTime = true;
            InitializeSyllogisms();
            SyllogismTable.ItemsSource = Syllogisms.Select(u => new SyllogismPresenter(u.Id,u.Name,(u.isValid)?"Valid":"Invalid"));
        }
        public void InitializeSyllogisms()
        {
            int id = 0;
            foreach (Mood mood1 in (Mood[])Enum.GetValues(typeof(Mood)))
            {
                foreach (Mood mood2 in (Mood[])Enum.GetValues(typeof(Mood)))
                {
                    foreach (Mood mood3 in (Mood[])Enum.GetValues(typeof(Mood)))
                    {
                        for (int i = 1; i < 5; i++)
                        {
                            Syllogism s = new Syllogism(id,mood1, mood2, mood3, i);
                            id++;
                            Syllogisms.Add(s);
                            s.CheckRules();
                            if (s.isValid)
                            {
                                ValidSyllogisms.Add(s);
                            }
                            else
                            {
                                InvalidSyllogisms.Add(s);
                            }
                        }
                    }
                }
            }
        }

        private void SyllogismSelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            if (SyllogismTable.SelectedItem != null) 
            {
                foreach (SyllogismPresenter item in e.AddedItems)
                {
                    var SyllogismWindow = new SyllogismWindow(Syllogisms[item.Id]);
                    SyllogismWindow.Show();
                }
            }
            isFirstTime = false;
        }

        private void SearchButton_Click(object sender, RoutedEventArgs e)
        {

        }

        private void SyllogismTable_BeginningEdit(object sender, DataGridBeginningEditEventArgs e)
        {

        }
    }
}
